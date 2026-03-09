#!/usr/bin/env python3
"""Generate a Steffen-style Java exam PDF – Flugzeug theme (v2).

Follows K3 (Fridge) pattern exactly:
  - ONE connected class diagram with orthogonal lines
  - Interface -> 2 implementations (one given)
  - Enum with .value method (connected to one implementation)
  - Base class with List<Interface> -> 2 subclasses override board()
  - Container class creates subclass instances
  - ExamTask with .values() loop
  - No Comparable/Comparator
"""

from fpdf import FPDF
import math

FONT_DIR = '/usr/share/fonts/TTF'


class ExamPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.set_auto_page_break(auto=True, margin=25)
        self.add_font('DejaVu', '', f'{FONT_DIR}/DejaVuSans.ttf')
        self.add_font('DejaVu', 'B', f'{FONT_DIR}/DejaVuSans-Bold.ttf')
        self.add_font('DejaVu', 'I', f'{FONT_DIR}/DejaVuSans-Oblique.ttf')
        self.add_font('DejaVu', 'BI', f'{FONT_DIR}/DejaVuSans-BoldOblique.ttf')
        self.add_font('Mono', '', f'{FONT_DIR}/DejaVuSansMono.ttf')
        self.add_font('Mono', 'B', f'{FONT_DIR}/DejaVuSansMono-Bold.ttf')

    def footer(self):
        self.set_y(-15)
        self.set_font('DejaVu', '', 9)
        self.cell(0, 10, str(self.page_no()), align='C')

    # ---- Text helpers ----

    def section_title(self, title, size=18):
        self.set_font('DejaVu', 'B', size)
        self.cell(0, 12, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def subsection_title(self, title, size=12):
        self.set_font('DejaVu', 'B', size)
        self.cell(0, 9, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def body_text(self, text):
        self.set_font('DejaVu', '', 10)
        self.multi_cell(0, 5.5, text)
        self.ln(1)

    def bullet_bold_rest(self, bold_part, rest):
        self.set_font('DejaVu', '', 10)
        self.set_x(self.l_margin)
        self.write(5.5, '  \u2022 ')
        self.set_font('DejaVu', 'B', 10)
        self.write(5.5, bold_part)
        self.set_font('DejaVu', '', 10)
        self.write(5.5, rest)
        self.ln(7)

    def bullet_method_text(self, method_name, rest):
        self.set_font('DejaVu', '', 10)
        self.write(5.5, '  \u2022 Die Methode ')
        self.set_font('DejaVu', 'B', 10)
        self.write(5.5, method_name)
        self.set_font('DejaVu', '', 10)
        self.write(5.5, ' ' + rest)
        self.ln(7)

    def indent_text(self, text):
        self.set_font('DejaVu', '', 10)
        self.set_x(self.l_margin + 12)
        self.multi_cell(self.w - self.l_margin - self.r_margin - 12, 5.5, text)
        self.ln(1)

    def indent_italic(self, text):
        self.set_font('DejaVu', 'I', 9)
        self.set_x(self.l_margin + 12)
        self.multi_cell(self.w - self.l_margin - self.r_margin - 12, 5, text)
        self.ln(1)

    def code_block(self, lines):
        self.set_font('Mono', '', 8)
        self.set_fill_color(242, 242, 242)
        for line in lines:
            self.set_x(self.l_margin + 14)
            self.cell(self.w - self.l_margin - self.r_margin - 20, 5, line,
                      fill=True, new_x="LMARGIN", new_y="NEXT")
        self.ln(3)

    def draw_table(self, headers, rows, col_widths):
        self.set_font('DejaVu', 'B', 8.5)
        self.set_fill_color(230, 230, 230)
        self.set_draw_color(150, 150, 150)
        for i, h in enumerate(headers):
            self.cell(col_widths[i], 7, h, border=1, fill=True)
        self.ln()
        self.set_font('Mono', '', 8)
        for row in rows:
            for i, cell_val in enumerate(row):
                self.cell(col_widths[i], 6.5, str(cell_val), border=1)
            self.ln()

    # ---- UML drawing helpers ----

    def uml_box(self, x, y, w, title, stereotype, attrs, methods,
                lh=2.8, font_sz=5.0):
        pad = 2.5
        stereo_h = (lh + 1) if stereotype else 0
        title_h = lh + 2
        header_h = stereo_h + title_h + pad
        attr_h = max(len(attrs) * lh + pad * 2, pad * 2) if attrs else pad * 2
        meth_h = max(len(methods) * lh + pad * 2, pad * 2) if methods else pad * 2
        total_h = header_h + attr_h + meth_h

        self.set_fill_color(218, 222, 238)
        self.set_draw_color(110, 110, 150)
        self.set_line_width(0.35)
        self.rect(x, y, w, total_h, style='DF')

        cy = y + pad / 2
        if stereotype:
            self.set_font('DejaVu', 'I', font_sz - 0.5)
            self.set_xy(x, cy)
            self.cell(w, lh, stereotype, align='C')
            cy += lh + 1

        self.set_font('DejaVu', 'B', font_sz + 1.5)
        self.set_xy(x, cy)
        self.cell(w, lh, title, align='C')
        cy = y + header_h
        self.line(x, cy, x + w, cy)

        self.set_font('Mono', '', font_sz)
        ay = cy + pad
        for attr in attrs:
            self.set_xy(x + 2, ay)
            if attr.endswith(' [U]'):
                attr_clean = attr[:-4]
                tw = self.get_string_width(attr_clean)
                self.cell(w - 4, lh, attr_clean)
                self.line(x + 2, ay + lh - 0.3, x + 2 + tw, ay + lh - 0.3)
            else:
                self.cell(w - 4, lh, attr)
            ay += lh
        cy += attr_h
        self.line(x, cy, x + w, cy)

        self.set_font('Mono', '', font_sz)
        my = cy + pad
        for meth in methods:
            self.set_xy(x + 2, my)
            if meth.endswith(' [U]'):
                meth_clean = meth[:-4]
                tw = self.get_string_width(meth_clean)
                self.cell(w - 4, lh, meth_clean)
                self.line(x + 2, my + lh - 0.3, x + 2 + tw, my + lh - 0.3)
            else:
                self.cell(w - 4, lh, meth)
            my += lh

        return total_h

    def _set_line_style(self):
        self.set_draw_color(110, 110, 150)
        self.set_line_width(0.3)

    def draw_ortho(self, points, dashed=False):
        """Draw orthogonal line through waypoints [(x,y), ...]."""
        self._set_line_style()
        for i in range(len(points) - 1):
            x1, y1 = points[i]
            x2, y2 = points[i + 1]
            if dashed:
                self._draw_dashed_seg(x1, y1, x2, y2)
            else:
                self.line(x1, y1, x2, y2)

    def _draw_dashed_seg(self, x1, y1, x2, y2):
        dash, gap = 2.0, 1.5
        dx, dy = x2 - x1, y2 - y1
        length = math.sqrt(dx * dx + dy * dy)
        if length == 0:
            return
        ux, uy = dx / length, dy / length
        pos = 0
        while pos < length:
            sx, sy = x1 + ux * pos, y1 + uy * pos
            end = min(pos + dash, length)
            ex, ey = x1 + ux * end, y1 + uy * end
            self.line(sx, sy, ex, ey)
            pos = end + gap

    def draw_label(self, x, y, text):
        self.set_font('DejaVu', 'I', 5.5)
        self.set_xy(x, y)
        self.cell(0, 3.5, text)

    def draw_open_triangle(self, x, y, size=2.2, direction='up'):
        """Hollow triangle for extends/implements."""
        self.set_draw_color(110, 110, 150)
        self.set_fill_color(255, 255, 255)
        self.set_line_width(0.3)
        h = size * 1.5
        if direction == 'up':
            self.polygon([(x, y), (x - size, y + h), (x + size, y + h)],
                         style='DF')
            return h
        elif direction == 'down':
            self.polygon([(x, y + h), (x - size, y), (x + size, y)],
                         style='DF')
            return h

    def draw_open_diamond(self, x, y, w=2.5, h=4, direction='down'):
        """Open diamond (composition). Returns extent in primary direction."""
        self.set_draw_color(110, 110, 150)
        self.set_fill_color(255, 255, 255)
        self.set_line_width(0.3)
        if direction == 'down':
            self.polygon([
                (x, y), (x + w, y + h / 2), (x, y + h), (x - w, y + h / 2)
            ], style='DF')
        elif direction == 'right':
            self.polygon([
                (x, y), (x + h / 2, y - w), (x + h, y), (x + h / 2, y + w)
            ], style='DF')
        return h


# =====================================================================
# EXAM CONTENT
# =====================================================================

def create_exam():
    pdf = ExamPDF()
    pdf.set_margins(20, 20, 20)

    # ===== PAGE 1: Title =====
    pdf.add_page()
    pdf.ln(90)
    pdf.set_font('DejaVu', 'B', 24)
    pdf.cell(0, 15, 'Probeklausur 06.03.2026', align='C',
             new_x="LMARGIN", new_y="NEXT")

    # ===== PAGE 2: Aufgabe 1 header + Glossar =====
    pdf.add_page()
    pdf.section_title('Aufgabe 1 (47.25 Punkte)')
    pdf.body_text('Implementiere die Klassen')

    classes = [
        ('Boardable', '1.5'),
        ('TicketClass', '3.5'),
        ('Passenger', '3.5'),
        ('Seat', '10.0'),
        ('BusinessSeat', '5.75'),
        ('EconomySeat', '6.0'),
        ('Airplane', '12.0'),
        ('ExamTask', '5.0'),
    ]
    for i, (cls, pts) in enumerate(classes):
        sep = ','
        if i == len(classes) - 2:
            sep = ' und'
        elif i == len(classes) - 1:
            sep = ''
        pdf.set_font('DejaVu', '', 10)
        pdf.write(6, '  \u2022 ')
        pdf.set_font('DejaVu', 'B', 10)
        pdf.write(6, cls)
        pdf.set_font('DejaVu', '', 10)
        pdf.write(6, f' ({pts} Punkte){sep}')
        pdf.ln(7)

    pdf.ln(3)
    pdf.body_text(
        'entsprechend dem Klassendiagramm.\n'
        'Befolge alle Hinweise bei der Implementierung!')
    pdf.body_text(
        'Die Klasse CrewMember ist gegeben und muss nicht '
        'implementiert werden.')

    pdf.ln(4)
    pdf.section_title('Glossar', 14)
    pdf.ln(1)

    glossar = [
        ('airplane', 'Flugzeug'),
        ('board', 'einsteigen'),
        ('boardable', 'einsteigefaehig'),
        ('crew member', 'Besatzungsmitglied'),
        ('letter', 'Buchstabe'),
        ('passenger', 'Passagier'),
        ('row', 'Reihe'),
        ('seat', 'Sitzplatz'),
        ('ticket class', 'Ticketklasse'),
        ('weight', 'Gewicht'),
    ]
    pdf.draw_table(['Englisch', 'Deutsch'], glossar, [45, 50])

    # ===== PAGE 3: Klassendiagramm (Landscape) =====
    draw_uml_page(pdf)

    # ===== PAGES 4-6: Hinweise =====
    draw_hints_pages(pdf)

    # ===== LAST PAGE: Java API =====
    draw_api_page(pdf)

    out = '/home/luggels/Documents/java/java-learner/probeklausur-flugzeug.pdf'
    pdf.output(out)
    print(f'PDF saved to: {out}')


def draw_uml_page(pdf):
    """Page 3: UML class diagram with orthogonal Steffen-style connections."""
    pdf.add_page('L')
    pdf.set_auto_page_break(auto=False)

    pdf.set_font('DejaVu', 'B', 14)
    pdf.cell(0, 10, 'Klassendiagramm', new_x="LMARGIN", new_y="NEXT")

    LH = 2.8
    FS = 5.0

    # ================================================================
    # BOX POSITIONS — 4-row grid layout
    # ================================================================

    # Row 0: Container + ExamTask
    air_x, air_y, air_w = 128, 18, 72
    et_x, et_y, et_w = 250, 18, 42

    # Row 1: Base class + Interface
    seat_x, seat_y, seat_w = 20, 58, 84
    board_x, board_y, board_w = 195, 64, 52

    # Row 2: Subclasses + Implementations
    bs_x, bs_y, bs_w = 6, 116, 78
    es_x, es_y, es_w = 92, 116, 66
    pass_x, pass_y, pass_w = 172, 116, 66
    cm_x, cm_y, cm_w = 244, 116, 48

    # Row 3: Exception + Enum
    exc_x, exc_y, exc_w = 18, 162, 66
    tc_x, tc_y, tc_w = 180, 158, 54

    # ================================================================
    # DRAW ALL BOXES
    # ================================================================

    air_h = pdf.uml_box(air_x, air_y, air_w,
        'Airplane', '',
        ['+seats: List<Seat> { final }'],
        ['+Airplane(numberOfRows: int,',
         '  seatsPerRow: int, maxWeight: double)',
         '+board(item: Boardable): boolean'],
        lh=LH, font_sz=FS)

    pdf.uml_box(et_x, et_y, et_w,
        'ExamTask', '',
        [],
        ['+ main(args: String[]): void [U]'],
        lh=LH, font_sz=FS)

    seat_h = pdf.uml_box(seat_x, seat_y, seat_w,
        'Seat', '',
        ['+row: int { final }',
         '+letter: char { final }',
         '+maxWeight: double { final }',
         '-passengers: List<Boardable>'],
        ['+Seat(row: int, letter: char,',
         '  maxWeight: double)',
         '#getMaxWeight(): double',
         '#usedWeight(): double',
         '-hasSpace(item: Boardable): boolean',
         '#board(item: Boardable): void'],
        lh=LH, font_sz=FS)

    board_h = pdf.uml_box(board_x, board_y, board_w,
        'Boardable', '\u00ABinterface\u00BB',
        [],
        ['+getWeight(): double'],
        lh=LH, font_sz=FS)

    bs_h = pdf.uml_box(bs_x, bs_y, bs_w,
        'BusinessSeat', '',
        ['-MINIMUM_SEATS: int {final} = 4 [U]',
         '-availableSeats: int'],
        ['+BusinessSeat(row: int, letter: char,',
         '  maxWeight: double, availableSeats: int)',
         '+board(item: Boardable): void'],
        lh=LH, font_sz=FS)

    es_h = pdf.uml_box(es_x, es_y, es_w,
        'EconomySeat', '',
        [],
        ['+EconomySeat(letter: char,',
         '  maxWeight: double)',
         '+board(item: Boardable): void'],
        lh=LH, font_sz=FS)

    pass_h = pdf.uml_box(pass_x, pass_y, pass_w,
        'Passenger', '',
        ['+name: String { final }',
         '+weight: double { final }',
         '+ticketClass: TicketClass { final }'],
        ['+Passenger(name: String,',
         '  weight: double,',
         '  ticketClass: TicketClass)',
         '+getWeight(): double'],
        lh=LH, font_sz=FS)

    cm_h = pdf.uml_box(cm_x, cm_y, cm_w,
        'CrewMember', '',
        ['+name: String { final }'],
        ['+CrewMember(name: String)',
         '+getWeight(): double'],
        lh=LH, font_sz=FS)

    exc_h = pdf.uml_box(exc_x, exc_y, exc_w,
        'Exception', '',
        [],
        ['+getMessage(): String'],
        lh=LH, font_sz=FS)

    tc_h = pdf.uml_box(tc_x, tc_y, tc_w,
        'TicketClass', '\u00ABenumeration\u00BB',
        ['Business,',
         'Economy,',
         'Standby;',
         '',
         '-value: char'],
        ['+TicketClass(value: char)',
         '+getValue(): char',
         '+canBoard(): boolean'],
        lh=LH, font_sz=FS)

    # ================================================================
    # COMPUTED BOTTOMS
    # ================================================================
    air_bot = air_y + air_h
    seat_bot = seat_y + seat_h
    board_bot = board_y + board_h
    bs_bot = bs_y + bs_h
    es_bot = es_y + es_h
    pass_bot = pass_y + pass_h

    # ================================================================
    # CONNECTION 1: Airplane --has--> Seat (composition)
    # Diamond at Airplane bottom, orthogonal route to Seat top
    # ================================================================
    dia_x = air_x + 12
    dia_h = pdf.draw_open_diamond(dia_x, air_bot, w=2.5, h=4)
    dia_bot = air_bot + dia_h
    seat_conn_x = seat_x + seat_w * 0.75  # 83
    mid_y1 = dia_bot + 2
    pdf.draw_ortho([
        (dia_x, dia_bot),
        (dia_x, mid_y1),
        (seat_conn_x, mid_y1),
        (seat_conn_x, seat_y),
    ])

    # ================================================================
    # CONNECTION 2: Seat --<>--> Boardable (composition, horizontal)
    # ================================================================
    assoc_y = seat_y + seat_h * 0.35
    dia2_h = pdf.draw_open_diamond(seat_x + seat_w, assoc_y,
                                    w=2.5, h=4, direction='right')
    pdf.draw_ortho([
        (seat_x + seat_w + dia2_h, assoc_y),
        (board_x, assoc_y),
    ])

    # ================================================================
    # CONNECTION 3: BusinessSeat --> Seat (extends)
    # ================================================================
    tri_x3 = seat_x + seat_w * 0.25  # ~41
    tri_h3 = pdf.draw_open_triangle(tri_x3, seat_bot, size=2.2)
    tri_base3 = seat_bot + tri_h3
    bs_top_x = bs_x + bs_w / 2  # ~45
    mid_y3 = tri_base3 + 2
    pdf.draw_ortho([
        (bs_top_x, bs_y),
        (bs_top_x, mid_y3),
        (tri_x3, mid_y3),
        (tri_x3, tri_base3),
    ])
    pdf.draw_label(bs_top_x - 18, mid_y3 - 3.5, 'extends')

    # ================================================================
    # CONNECTION 4: EconomySeat --> Seat (extends)
    # ================================================================
    tri_x4 = seat_x + seat_w * 0.75  # ~83
    tri_h4 = pdf.draw_open_triangle(tri_x4, seat_bot, size=2.2)
    tri_base4 = seat_bot + tri_h4
    es_top_x = es_x + es_w / 2  # ~125
    mid_y4 = tri_base4 + 2
    pdf.draw_ortho([
        (es_top_x, es_y),
        (es_top_x, mid_y4),
        (tri_x4, mid_y4),
        (tri_x4, tri_base4),
    ])
    pdf.draw_label(es_top_x - 4, mid_y4 - 3.5, 'extends')

    # ================================================================
    # CONNECTION 5: Passenger --> Boardable (implements, dashed)
    # ================================================================
    tri_x5 = board_x + board_w * 0.3  # ~210.6
    tri_h5 = pdf.draw_open_triangle(tri_x5, board_bot, size=2.2)
    tri_base5 = board_bot + tri_h5
    pass_top_x = pass_x + pass_w / 2  # ~205
    mid_y5 = tri_base5 + 3
    pdf.draw_ortho([
        (pass_top_x, pass_y),
        (pass_top_x, mid_y5),
        (tri_x5, mid_y5),
        (tri_x5, tri_base5),
    ])
    pdf.draw_label(pass_top_x - 20, mid_y5 - 3.5, 'implements')

    # ================================================================
    # CONNECTION 6: CrewMember --> Boardable (implements, dashed)
    # ================================================================
    tri_x6 = board_x + board_w * 0.7  # ~231.4
    tri_h6 = pdf.draw_open_triangle(tri_x6, board_bot, size=2.2)
    tri_base6 = board_bot + tri_h6
    cm_top_x = cm_x + cm_w / 2  # ~268
    mid_y6 = tri_base6 + 3
    pdf.draw_ortho([
        (cm_top_x, cm_y),
        (cm_top_x, mid_y6),
        (tri_x6, mid_y6),
        (tri_x6, tri_base6),
    ])
    pdf.draw_label(cm_top_x - 18, mid_y6 - 3.5, 'implements')

    # ================================================================
    # CONNECTION 7: Passenger --has--> TicketClass (composition)
    # ================================================================
    dia7_x = pass_x + pass_w * 0.4  # ~198.4
    dia7_h = pdf.draw_open_diamond(dia7_x, pass_bot, w=2, h=3.5)
    dia7_bot = pass_bot + dia7_h
    tc_top_x = tc_x + tc_w / 2  # ~207
    mid_y7 = dia7_bot + 1.5
    pdf.draw_ortho([
        (dia7_x, dia7_bot),
        (dia7_x, mid_y7),
        (tc_top_x, mid_y7),
        (tc_top_x, tc_y),
    ])

    # ================================================================
    # CONNECTION 8: Seat --throws--> Exception (dashed, routed left)
    # Route: Seat left side -> down along left edge -> right to Exception
    # ================================================================
    seat_throw_y = seat_y + seat_h * 0.8
    left_route_x = 3  # left edge, avoids all boxes
    exc_left = exc_x
    exc_mid_y = exc_y + 5
    pdf.draw_ortho([
        (seat_x, seat_throw_y),
        (left_route_x, seat_throw_y),
        (left_route_x, exc_mid_y),
        (exc_left, exc_mid_y),
    ])
    pdf.draw_label(left_route_x + 1, exc_mid_y - 8, 'throws')

    # ================================================================
    # CONNECTION 9: BusinessSeat --throws--> Exception (solid)
    # ================================================================
    bs_throw_x = bs_x + 12
    exc_top_l = exc_x + exc_w * 0.35
    throws_mid_y = exc_y - 5
    pdf.draw_ortho([
        (bs_throw_x, bs_bot),
        (bs_throw_x, throws_mid_y),
        (exc_top_l, throws_mid_y),
        (exc_top_l, exc_y),
    ])
    pdf.draw_label(bs_throw_x + 2, throws_mid_y - 3.5, 'throws')

    # ================================================================
    # CONNECTION 10: EconomySeat --throws--> Exception (solid)
    # ================================================================
    es_throw_x = es_x + 12
    exc_top_r = exc_x + exc_w * 0.7
    pdf.draw_ortho([
        (es_throw_x, es_bot),
        (es_throw_x, throws_mid_y),
        (exc_top_r, throws_mid_y),
        (exc_top_r, exc_y),
    ])
    pdf.draw_label(es_throw_x - 14, es_bot + 2, 'throws')

    pdf.set_auto_page_break(auto=True, margin=25)


def draw_hints_pages(pdf):
    """Pages 4-6: Implementation hints."""

    # ===== PAGE 4: Boardable, TicketClass, Passenger, Seat =====
    pdf.add_page('P')

    pdf.subsection_title('Hinweise zur Klasse Boardable (Einsteigefaehig)')
    pdf.bullet_method_text('getWeight',
        'soll das Gewicht zurueckgeben.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse TicketClass (Ticketklasse)')
    pdf.bullet_method_text('getValue',
        'soll den Wert (value) der Ticketklasse zurueckgeben.')
    pdf.bullet_method_text('canBoard',
        'soll true zurueckgeben, wenn abhaengig von der '
        'Ticketklasse eingestiegen werden darf.')
    pdf.indent_text(
        'Es darf eingestiegen werden, sofern es kein Standby-Ticket ist.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse Passenger (Passagier)')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.bullet_method_text('getWeight',
        'soll das Gewicht zurueckgeben.')
    pdf.indent_text(
        'Das Gewicht eines Passagiers ist die Haelfte des weight-Attributs.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse Seat (Sitzplatz)')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.bullet_method_text('getMaxWeight',
        'soll das maximale Gewicht eines Sitzplatzes berechnen.')
    pdf.indent_text(
        'Das maximale Gewicht eines Sitzplatzes ist abhaengig '
        'von maxWeight.')
    pdf.bullet_method_text('usedWeight',
        'soll das bereits benutzte Gewicht eines Sitzplatzes berechnen.')
    pdf.indent_text(
        'Das benutzte Gewicht ist die Summe des Gewichts '
        'aller Passagiere eines Sitzplatzes.')
    pdf.bullet_method_text('hasSpace',
        'soll ermitteln, ob der eingehende Passagier '
        'auf den Sitz passt.')
    pdf.indent_text(
        'Ein Passagier hat genuegend Platz, sobald das Gewicht des '
        'eingehenden Passagiers kleiner ist als das restlich vorhandene '
        'Gewicht eines Sitzplatzes.')
    pdf.bullet_method_text('board',
        'soll versuchen einen Passagier auf dem Sitz zu platzieren.')
    pdf.indent_text(
        'Hat der zu platzierende Passagier genug Platz, soll er dem '
        'Sitz hinzugefuegt werden. Andernfalls soll ein Fehler '
        'ausgeloest werden, dass kein Platz mehr vorhanden ist.')
    pdf.ln(3)

    # ===== PAGE 5: BusinessSeat, EconomySeat =====
    pdf.add_page('P')

    pdf.subsection_title('Hinweise zur Klasse BusinessSeat')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.indent_text(
        'Der Business-Sitz hat breitere Sitze und somit 10 Einheiten '
        'weniger maximales Gewicht.')
    pdf.bullet_method_text('board',
        'soll versuchen, einen Passagier auf dem Sitz zu platzieren.')
    pdf.indent_text(
        'Nur Besatzungsmitglieder (CrewMember) duerfen auf dem Business-Sitz '
        'platziert werden. Ist die Anzahl der verfuegbaren Sitze '
        '(availableSeats) kleiner als die Mindestanzahl (MINIMUM_SEATS), '
        'darf niemand auf dem Sitz platziert werden.')
    pdf.indent_text(
        'Kann der Passagier nicht platziert werden, soll ein Fehler '
        'ausgeloest werden, dass nur Crew in der Business Klasse '
        'erlaubt ist.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse EconomySeat')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.indent_text(
        'Der Economy-Sitz soll immer in der untersten Reihe sein '
        '(Reihe 1).')
    pdf.bullet_method_text('board',
        'soll versuchen, einen Passagier auf dem Sitz zu platzieren.')
    pdf.indent_text(
        'Nur Passagiere (Passenger) deren Ticketklasse einsteigen darf, '
        'duerfen auf dem Economy-Sitz platziert werden.')
    pdf.indent_text(
        'Kann der Passagier nicht platziert werden, soll ein Fehler '
        'ausgeloest werden, dass nur Passagiere mit gueltigem Ticket '
        'erlaubt sind.')
    pdf.ln(3)

    # ===== PAGE 6: Airplane, ExamTask =====
    pdf.add_page('P')

    pdf.subsection_title('Hinweise zur Klasse Airplane (Flugzeug)')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.indent_text(
        'Jedes Flugzeug hat mehrere Sitze. Es gibt jedoch immer genau '
        'einen Business-Sitz und einen Economy-Sitz. Der Konstruktor soll '
        'nach der Initialisierung aller Attribute zuerst den Business-Sitz, '
        'dann den Economy-Sitz und anschliessend die normalen Sitze erzeugen '
        'und der internen Liste hinzufuegen.')
    pdf.indent_text(
        'Die normalen Sitze werden in einem verschachtelten Loop erzeugt: '
        'Der aeussere Loop iteriert ueber die Reihen (absteigend), '
        'der innere Loop ueber die Sitzbuchstaben (A, B, C, ...).')
    pdf.indent_text(
        'Der Economy-Sitz hat immer die geringste Reihe (Reihe 1) und '
        'der Business-Sitz immer die hoechste Reihe. Der Business-Sitz '
        'hat 6 verfuegbare Sitze (availableSeats).')

    pdf.ln(1)
    pdf.indent_italic(
        'Beispiel Liste mit numberOfRows = 3 und seatsPerRow = 2:')

    pdf.code_block([
        '- BusinessSeat   - Reihe = 5, Buchstabe = A',
        '- EconomySeat    - Reihe = 1, Buchstabe = A',
        '- normaler Sitz  - Reihe = 4, Buchstabe = A',
        '- normaler Sitz  - Reihe = 4, Buchstabe = B',
        '- normaler Sitz  - Reihe = 3, Buchstabe = A',
        '- normaler Sitz  - Reihe = 3, Buchstabe = B',
        '- normaler Sitz  - Reihe = 2, Buchstabe = A',
        '- normaler Sitz  - Reihe = 2, Buchstabe = B',
    ])

    pdf.bullet_method_text('board',
        'soll einen Passagier platzieren und zurueckgeben, '
        'ob es funktioniert hat.')
    pdf.indent_text(
        'Versuche einen Platz fuer den Passagier im Flugzeug zu finden. '
        'Wenn ein Platz gefunden wurde, soll auf der Konsole die '
        'Reihe und der Buchstabe ausgegeben werden.')
    pdf.indent_text(
        'Wenn ein Passagier auf einem Sitz nicht platziert werden konnte, '
        'soll der Grund auf der Konsole ausgegeben werden.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse ExamTask')
    pdf.indent_text(
        'Es soll ein Flugzeug mit 4 Reihen, 3 Sitzen pro Reihe '
        'und einem maximalen Gewicht von 90 erstellt werden.')
    pdf.indent_text(
        'Erstelle ein Besatzungsmitglied mit einem Namen deiner Wahl '
        'und versuche es im Flugzeug zu platzieren.')
    pdf.indent_text(
        'Iteriere ueber alle Ticketklassen. Erstelle fuer jede '
        'Ticketklasse einen Passagier mit einem Gewicht von 70 '
        'und versuche ihn im Flugzeug zu platzieren. '
        'Verwende den Wert (getValue) der Ticketklasse im Namen '
        'des Passagiers.')
    pdf.indent_text(
        'Falls kein Platz gefunden wurde, soll dies zusammen mit dem '
        'Wert der Ticketklasse auf der Konsole ausgegeben werden.')


def draw_api_page(pdf):
    """Last page: Java API reference."""
    pdf.add_page('P')
    pdf.section_title('Java API', 15)
    pdf.ln(2)

    api_data = [
        ('TicketClass', 'values()', 'X', 'TicketClass[]'),
        ('TicketClass', 'name()', '', 'String'),
        ('Exception', 'getMessage()', '', 'String'),
        ('Boolean', 'valueOf(s: String)', 'X', 'Boolean'),
        ('Boolean', 'valueOf(b: boolean)', 'X', 'Boolean'),
        ('Double', 'valueOf(s: String)', 'X', 'Double'),
        ('Double', 'valueOf(d: double)', 'X', 'Double'),
        ('Integer', 'valueOf(s: String)', 'X', 'Integer'),
        ('Integer', 'valueOf(i: int)', 'X', 'Integer'),
        ('String', 'charAt(index: int)', '', 'char'),
        ('String', 'length()', '', 'int'),
    ]
    pdf.draw_table(
        ['Klasse', 'Methode', 'Statisch', 'Rueckgabetyp'],
        api_data,
        [32, 60, 18, 30])

    pdf.ln(8)
    pdf.section_title('Java Collections Framework', 15)
    pdf.ln(2)

    coll_data = [
        ('ArrayList<T>', 'add(element: T)', '', 'boolean'),
        ('ArrayList<T>', 'add(index: int, element: T)', '', 'void'),
        ('ArrayList<T>', 'contains(element: T)', '', 'boolean'),
        ('ArrayList<T>', 'get(index: int)', '', 'T'),
        ('ArrayList<T>', 'remove(index: int)', '', 'T'),
        ('ArrayList<T>', 'remove(element: T)', '', 'boolean'),
        ('ArrayList<T>', 'size()', '', 'int'),
        ('Collections', 'sort(list: List<T>)', 'X', 'void'),
        ('Collections', 'sort(list, c: Comparator<T>)', 'X', 'void'),
    ]
    pdf.draw_table(
        ['Klasse', 'Methode', 'Statisch', 'Rueckgabetyp'],
        coll_data,
        [32, 70, 18, 25])

    pdf.ln(8)
    pdf.section_title('Schnittstellen', 15)
    pdf.ln(2)

    intf_data = [
        ('Comparable<T>', 'compareTo(o: T)', '', 'int'),
        ('Comparator<T>', 'compare(o1: T, o2: T)', '', 'int'),
    ]
    pdf.draw_table(
        ['Klasse', 'Methode', 'Statisch', 'Rueckgabetyp'],
        intf_data,
        [32, 60, 18, 30])


if __name__ == '__main__':
    create_exam()
