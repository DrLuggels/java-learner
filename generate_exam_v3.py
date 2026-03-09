#!/usr/bin/env python3
"""Generate a Steffen-style Java exam PDF – Flugzeug V3 (Seat-focused with getSeatNumber).

Follows K3 (Fridge) pattern with Seat as hub class:
  - ONE connected class diagram with orthogonal lines
  - Interface -> 2 implementations (one given)
  - Enum with .value method
  - Base class (Seat) with List<Interface> -> 2 subclasses override assign()
  - Container class creates subclass instances (nested loop)
  - ExamTask with .values() loop
  - No Comparable/Comparator
  - Key feature: getSeatNumber() combines row + letter -> "4A"
"""

from fpdf import FPDF

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

    def draw_ortho(self, points):
        """Draw orthogonal line through waypoints [(x,y), ...]."""
        self._set_line_style()
        for i in range(len(points) - 1):
            x1, y1 = points[i]
            x2, y2 = points[i + 1]
            self.line(x1, y1, x2, y2)

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
    pdf.cell(0, 15, 'Probeklausur V3 \u2014 06.03.2026', align='C',
             new_x="LMARGIN", new_y="NEXT")

    # ===== PAGE 2: Aufgabe 1 header + Glossar =====
    pdf.add_page()
    pdf.section_title('Aufgabe 1 (47.25 Punkte)')
    pdf.body_text('Implementiere die Klassen')

    classes = [
        ('Boardable', '1.5'),
        ('BoardingGroup', '3.5'),
        ('Passenger', '3.5'),
        ('Seat', '10.0'),
        ('CrewSeat', '5.75'),
        ('ExitSeat', '6.0'),
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
        ('assign', 'zuweisen'),
        ('board', 'einsteigen'),
        ('boardable', 'einsteigefaehig'),
        ('boarding group', 'Boarding-Gruppe'),
        ('crew member', 'Besatzungsmitglied'),
        ('crew seat', 'Crew-Sitz'),
        ('exit seat', 'Notausgang-Sitz'),
        ('passenger', 'Passagier'),
        ('priority', 'Prioritaet'),
        ('seat', 'Sitz'),
        ('standby', 'Nachruecker'),
    ]
    pdf.draw_table(['Englisch', 'Deutsch'], glossar, [45, 50])

    # ===== PAGE 3: Klassendiagramm (Landscape) =====
    draw_uml_page(pdf)

    # ===== PAGES 4-6: Hinweise =====
    draw_hints_pages(pdf)

    # ===== LAST PAGE: Java API =====
    draw_api_page(pdf)

    out = '/home/luggels/Documents/java/java-learner/probeklausur-flugzeug-v3.pdf'
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
    air_x, air_y, air_w = 125, 18, 74
    et_x, et_y, et_w = 250, 18, 42

    # Row 1: Base class (Seat) + Interface (Boardable)
    seat_x, seat_y, seat_w = 18, 58, 84
    board_x, board_y, board_w = 195, 64, 46

    # Row 2: Subclasses + Implementations
    cs_x, cs_y, cs_w = 4, 118, 78
    es_x, es_y, es_w = 90, 118, 64
    pass_x, pass_y, pass_w = 168, 106, 66
    crew_x, crew_y, crew_w = 244, 118, 48

    # Row 3: Exception + Enum
    exc_x, exc_y, exc_w = 18, 164, 66
    bg_x, bg_y, bg_w = 168, 158, 66

    # ================================================================
    # DRAW ALL BOXES
    # ================================================================

    air_h = pdf.uml_box(air_x, air_y, air_w,
        'Airplane', '',
        ['+seats: List<Seat> { final }'],
        ['+Airplane(numberOfRows: int,',
         '  seatsPerRow: int,',
         '  maxPassengers: int)',
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
         '+maxPassengers: int { final }',
         '-passengers: List<Boardable>'],
        ['+Seat(row: int, letter: char,',
         '  maxPassengers: int)',
         '#getSeatNumber(): String',
         '#isFull(): boolean',
         '#assign(item: Boardable): void'],
        lh=LH, font_sz=FS)

    board_h = pdf.uml_box(board_x, board_y, board_w,
        'Boardable', '\u00ABinterface\u00BB',
        [],
        ['+getName(): String'],
        lh=LH, font_sz=FS)

    cs_h = pdf.uml_box(cs_x, cs_y, cs_w,
        'CrewSeat', '',
        ['-MIN_RANK: int {final} = 3 [U]',
         '-crewRank: int'],
        ['+CrewSeat(row: int,',
         '  letter: char,',
         '  maxPsgrs: int, crewRank: int)',
         '+assign(item: Boardable): void'],
        lh=LH, font_sz=FS)

    es_h = pdf.uml_box(es_x, es_y, es_w,
        'ExitSeat', '',
        [],
        ['+ExitSeat(letter: char,',
         '  maxPsgrs: int)',
         '+assign(item: Boardable): void'],
        lh=LH, font_sz=FS)

    pass_h = pdf.uml_box(pass_x, pass_y, pass_w,
        'Passenger', '',
        ['+name: String { final }',
         '+age: int { final }',
         '+boardingGroup:',
         '  BoardingGroup { final }'],
        ['+Passenger(name: String,',
         '  age: int,',
         '  bGroup: BoardingGroup)',
         '+getName(): String'],
        lh=LH, font_sz=FS)

    crew_h = pdf.uml_box(crew_x, crew_y, crew_w,
        'CrewMember', '',
        ['+name: String { final }'],
        ['+CrewMember(name: String)',
         '+getName(): String'],
        lh=LH, font_sz=FS)

    exc_h = pdf.uml_box(exc_x, exc_y, exc_w,
        'Exception', '',
        [],
        ['+getMessage(): String'],
        lh=LH, font_sz=FS)

    bg_h = pdf.uml_box(bg_x, bg_y, bg_w,
        'BoardingGroup', '\u00ABenumeration\u00BB',
        ['Priority,',
         'Standard,',
         'Standby;',
         '',
         '-value: char'],
        ['+BoardingGroup(value: char)',
         '+getValue(): char',
         '+canBoard(): boolean'],
        lh=LH, font_sz=FS)

    # ================================================================
    # COMPUTED BOTTOMS
    # ================================================================
    air_bot = air_y + air_h
    seat_bot = seat_y + seat_h
    board_bot = board_y + board_h
    cs_bot = cs_y + cs_h
    es_bot = es_y + es_h
    pass_bot = pass_y + pass_h

    # ================================================================
    # CONNECTION 1: Airplane --<>--> Seat (composition)
    # Diamond at Airplane bottom, orthogonal route to Seat top
    # ================================================================
    dia_x = air_x + 12
    dia_h = pdf.draw_open_diamond(dia_x, air_bot, w=2.5, h=4)
    dia_bot = air_bot + dia_h
    seat_conn_x = seat_x + seat_w * 0.75
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
    # CONNECTION 3: CrewSeat --> Seat (extends)
    # ================================================================
    tri_x3 = seat_x + seat_w * 0.25
    tri_h3 = pdf.draw_open_triangle(tri_x3, seat_bot, size=2.2)
    tri_base3 = seat_bot + tri_h3
    cs_top_x = cs_x + cs_w / 2
    mid_y3 = tri_base3 + 2
    pdf.draw_ortho([
        (cs_top_x, cs_y),
        (cs_top_x, mid_y3),
        (tri_x3, mid_y3),
        (tri_x3, tri_base3),
    ])
    pdf.draw_label(cs_top_x - 18, mid_y3 - 3.5, 'extends')

    # ================================================================
    # CONNECTION 4: ExitSeat --> Seat (extends)
    # ================================================================
    tri_x4 = seat_x + seat_w * 0.75
    tri_h4 = pdf.draw_open_triangle(tri_x4, seat_bot, size=2.2)
    tri_base4 = seat_bot + tri_h4
    es_top_x = es_x + es_w / 2
    mid_y4 = tri_base4 + 2
    pdf.draw_ortho([
        (es_top_x, es_y),
        (es_top_x, mid_y4),
        (tri_x4, mid_y4),
        (tri_x4, tri_base4),
    ])
    pdf.draw_label(es_top_x - 4, mid_y4 - 3.5, 'extends')

    # ================================================================
    # CONNECTION 5: Passenger --> Boardable (implements)
    # ================================================================
    tri_x5 = board_x + board_w * 0.3
    tri_h5 = pdf.draw_open_triangle(tri_x5, board_bot, size=2.2)
    tri_base5 = board_bot + tri_h5
    pass_top_x = pass_x + pass_w / 2
    mid_y5 = tri_base5 + 3
    pdf.draw_ortho([
        (pass_top_x, pass_y),
        (pass_top_x, mid_y5),
        (tri_x5, mid_y5),
        (tri_x5, tri_base5),
    ])
    pdf.draw_label(pass_top_x - 20, mid_y5 - 3.5, 'implements')

    # ================================================================
    # CONNECTION 6: CrewMember --> Boardable (implements)
    # ================================================================
    tri_x6 = board_x + board_w * 0.7
    tri_h6 = pdf.draw_open_triangle(tri_x6, board_bot, size=2.2)
    tri_base6 = board_bot + tri_h6
    crew_top_x = crew_x + crew_w / 2
    mid_y6 = tri_base6 + 3
    pdf.draw_ortho([
        (crew_top_x, crew_y),
        (crew_top_x, mid_y6),
        (tri_x6, mid_y6),
        (tri_x6, tri_base6),
    ])
    pdf.draw_label(crew_top_x - 18, mid_y6 - 3.5, 'implements')

    # ================================================================
    # CONNECTION 7: Passenger --<>--> BoardingGroup (composition)
    # ================================================================
    dia7_x = pass_x + pass_w * 0.4
    dia7_h = pdf.draw_open_diamond(dia7_x, pass_bot, w=2, h=3.5)
    dia7_bot = pass_bot + dia7_h
    bg_top_x = bg_x + bg_w / 2
    mid_y7 = dia7_bot + 1.5
    pdf.draw_ortho([
        (dia7_x, dia7_bot),
        (dia7_x, mid_y7),
        (bg_top_x, mid_y7),
        (bg_top_x, bg_y),
    ])

    # ================================================================
    # CONNECTION 8: Seat --throws--> Exception (routed along left edge)
    # ================================================================
    seat_throw_y = seat_y + seat_h * 0.8
    left_route_x = 3
    exc_mid_y = exc_y + 5
    pdf.draw_ortho([
        (seat_x, seat_throw_y),
        (left_route_x, seat_throw_y),
        (left_route_x, exc_mid_y),
        (exc_x, exc_mid_y),
    ])
    pdf.draw_label(left_route_x + 1, exc_mid_y - 8, 'throws')

    # ================================================================
    # CONNECTION 9: CrewSeat --throws--> Exception
    # ================================================================
    cs_throw_x = cs_x + 12
    exc_top_l = exc_x + exc_w * 0.35
    throws_mid_y = exc_y - 5
    pdf.draw_ortho([
        (cs_throw_x, cs_bot),
        (cs_throw_x, throws_mid_y),
        (exc_top_l, throws_mid_y),
        (exc_top_l, exc_y),
    ])
    pdf.draw_label(cs_throw_x + 2, throws_mid_y - 3.5, 'throws')

    # ================================================================
    # CONNECTION 10: ExitSeat --throws--> Exception
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

    # ===== PAGE 4: Boardable, BoardingGroup, Passenger, Seat =====
    pdf.add_page('P')

    pdf.subsection_title('Hinweise zur Klasse Boardable (Einsteigefaehig)')
    pdf.bullet_method_text('getName',
        'soll den Namen zurueckgeben.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse BoardingGroup (Boarding-Gruppe)')
    pdf.bullet_method_text('getValue',
        'soll den Wert (value) der Boarding-Gruppe zurueckgeben.')
    pdf.bullet_method_text('canBoard',
        'soll true zurueckgeben, wenn die Boarding-Gruppe '
        'zum Einsteigen berechtigt ist.')
    pdf.indent_text(
        'Eine Boarding-Gruppe ist zum Einsteigen berechtigt, '
        'sofern es kein Nachruecker (Standby) ist.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse Passenger (Passagier)')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.bullet_method_text('getName',
        'soll den Namen zurueckgeben.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse Seat (Sitz)')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.bullet_method_text('getSeatNumber',
        'soll die Sitzkennung als Text zurueckgeben.')
    pdf.indent_text(
        'Die Sitzkennung besteht aus der Reihennummer und dem '
        'Buchstaben (z.B. "4A" fuer Reihe 4, Buchstabe A).')
    pdf.bullet_method_text('isFull',
        'soll ermitteln, ob der Sitz voll belegt ist.')
    pdf.indent_text(
        'Ein Sitz ist voll, sobald die Anzahl der Passagiere '
        'die maximale Anzahl (maxPassengers) erreicht hat.')
    pdf.bullet_method_text('assign',
        'soll versuchen einen Passagier dem Sitz zuzuweisen.')
    pdf.indent_text(
        'Ist der Sitz nicht voll, soll der Name des Passagiers '
        'und die Sitzkennung auf der Konsole ausgegeben und der '
        'Passagier hinzugefuegt werden. '
        'Ist der Sitz voll, soll ein Fehler mit der Sitzkennung '
        'ausgeloest werden.')
    pdf.indent_italic(
        'Bsp: "Pilot Mueller auf Sitz 5A"')
    pdf.ln(3)

    # ===== PAGE 5: CrewSeat, ExitSeat =====
    pdf.add_page('P')

    pdf.subsection_title('Hinweise zur Klasse CrewSeat (Crew-Sitz)')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.indent_text(
        'Der Crew-Sitz hat extra Ausruestung und somit 1 Platz '
        'weniger als die maximale Anzahl.')
    pdf.bullet_method_text('assign',
        'soll versuchen, einen Passagier im Crew-Sitz '
        'zu platzieren.')
    pdf.indent_text(
        'Nur Besatzungsmitglieder (CrewMember) duerfen im Crew-Sitz '
        'platziert werden. Ist der Crew-Rang '
        '(crewRank) kleiner als der Mindest-Rang (MIN_RANK), '
        'darf niemand platziert werden.')
    pdf.indent_text(
        'Kann der Passagier nicht platziert werden, soll ein Fehler '
        'ausgeloest werden, dass nur Crew in diesem Sitz '
        'erlaubt ist.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse ExitSeat (Notausgang-Sitz)')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.indent_text(
        'Der Notausgang-Sitz soll immer in der untersten Reihe sein '
        '(Reihe 1).')
    pdf.bullet_method_text('assign',
        'soll versuchen, einen Passagier im Notausgang-Sitz '
        'zu platzieren.')
    pdf.indent_text(
        'Nur Passagiere (Passenger) deren Boarding-Gruppe zum '
        'Einsteigen berechtigt ist, '
        'duerfen im Notausgang-Sitz platziert werden.')
    pdf.indent_text(
        'Kann der Passagier nicht platziert werden, soll ein Fehler '
        'ausgeloest werden, dass nur Passagiere mit gueltigem '
        'Boarding erlaubt sind.')
    pdf.ln(3)

    # ===== PAGE 6: Airplane, ExamTask =====
    pdf.add_page('P')

    pdf.subsection_title('Hinweise zur Klasse Airplane (Flugzeug)')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.indent_text(
        'Jedes Flugzeug hat mehrere Sitze. Es gibt jedoch immer genau '
        'einen Crew-Sitz und einen Notausgang-Sitz. Der Konstruktor '
        'soll nach der Initialisierung aller Attribute zuerst den '
        'Crew-Sitz, dann den Notausgang-Sitz und anschliessend '
        'die normalen Sitze erzeugen und der internen Liste hinzufuegen.')
    pdf.indent_text(
        'Die normalen Sitze werden in einem verschachtelten Loop erzeugt '
        '(Reihen absteigend, Buchstaben aufsteigend). '
        'Der Notausgang-Sitz hat immer die geringste Reihe (Reihe 1, '
        'Buchstabe A) und der Crew-Sitz immer die hoechste Reihe '
        '(Buchstabe A). Der Crew-Sitz hat 4 als Crew-Rang (crewRank).')

    pdf.ln(1)
    pdf.indent_italic(
        'Beispiel Liste mit numberOfRows = 3, seatsPerRow = 2, '
        'maxPassengers = 2:')

    pdf.code_block([
        '- CrewSeat  - Sitz 5A, max. 1 Passagier (2-1)',
        '- ExitSeat  - Sitz 1A, max. 2 Passagiere',
        '- Seat      - Sitz 4A, max. 2 Passagiere',
        '- Seat      - Sitz 4B, max. 2 Passagiere',
        '- ...         (Reihen 3, 2 analog)',
    ])

    pdf.ln(2)
    pdf.bullet_method_text('board',
        'soll einen Passagier platzieren und zurueckgeben, '
        'ob es funktioniert hat.')
    pdf.indent_text(
        'Versuche einen Platz fuer den Passagier im Flugzeug zu finden, '
        'indem ueber alle Sitze iteriert wird. '
        'Wenn ein Platz gefunden wurde, soll true zurueckgegeben werden.')
    pdf.indent_text(
        'Wenn der Passagier in einem Sitz nicht platziert werden konnte, '
        'soll die Fehlermeldung auf der Konsole ausgegeben und der '
        'naechste Sitz versucht werden.')
    pdf.indent_text(
        'Konnte der Passagier in keinem Sitz platziert werden, '
        'soll false zurueckgegeben werden.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse ExamTask')
    pdf.indent_text(
        'Es soll ein Flugzeug mit 3 Reihen, 2 Sitzen pro Reihe '
        'und maximal 2 Passagieren pro Sitz erstellt werden.')
    pdf.indent_text(
        'Erstelle ein Besatzungsmitglied mit einem Namen deiner Wahl '
        'und versuche es im Flugzeug zu platzieren. Falls kein Platz '
        'gefunden wurde, soll dies auf der Konsole ausgegeben werden.')
    pdf.indent_text(
        'Iteriere ueber alle Boarding-Gruppen. Erstelle fuer jede '
        'Boarding-Gruppe einen Passagier mit einem Alter von 30 '
        'und versuche ihn im Flugzeug zu platzieren. '
        'Verwende den Wert (getValue) der Boarding-Gruppe im Namen '
        'des Passagiers.')
    pdf.indent_text(
        'Falls kein Platz gefunden wurde, soll dies zusammen mit dem '
        'Wert der Boarding-Gruppe auf der Konsole ausgegeben werden.')


def draw_api_page(pdf):
    """Last page: Java API reference."""
    pdf.add_page('P')
    pdf.section_title('Java API', 15)
    pdf.ln(2)

    api_data = [
        ('BoardingGroup', 'values()', 'X', 'BoardingGroup[]'),
        ('BoardingGroup', 'name()', '', 'String'),
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
        [35, 60, 18, 30])

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
