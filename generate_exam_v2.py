#!/usr/bin/env python3
"""Generate a Steffen-style Java exam PDF – Flugzeug V2 (Row-based).

Follows K3 (Fridge) pattern with Row as hub class instead of Seat:
  - ONE connected class diagram with orthogonal lines
  - Interface -> 2 implementations (one given)
  - Enum with .value method
  - Base class (Row) with List<Interface> -> 2 subclasses override add()
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
    pdf.cell(0, 15, 'Probeklausur V2 — 06.03.2026', align='C',
             new_x="LMARGIN", new_y="NEXT")

    # ===== PAGE 2: Aufgabe 1 header + Glossar =====
    pdf.add_page()
    pdf.section_title('Aufgabe 1 (47.25 Punkte)')
    pdf.body_text('Implementiere die Klassen')

    classes = [
        ('Boardable', '1.5'),
        ('SeatType', '3.5'),
        ('Passenger', '3.5'),
        ('Row', '10.0'),
        ('FirstClassRow', '5.75'),
        ('EmergencyRow', '6.0'),
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
        'Die Klasse FlightCrew ist gegeben und muss nicht '
        'implementiert werden.')

    pdf.ln(4)
    pdf.section_title('Glossar', 14)
    pdf.ln(1)

    glossar = [
        ('airplane', 'Flugzeug'),
        ('aisle', 'Gang'),
        ('board', 'einsteigen'),
        ('boardable', 'einsteigefaehig'),
        ('emergency row', 'Notausgangreihe'),
        ('first class', 'First Class'),
        ('flight crew', 'Flugbesatzung'),
        ('passenger', 'Passagier'),
        ('preferred', 'bevorzugt'),
        ('row', 'Reihe'),
        ('seat type', 'Sitztyp'),
        ('window', 'Fenster'),
    ]
    pdf.draw_table(['Englisch', 'Deutsch'], glossar, [45, 50])

    # ===== PAGE 3: Klassendiagramm (Landscape) =====
    draw_uml_page(pdf)

    # ===== PAGES 4-6: Hinweise =====
    draw_hints_pages(pdf)

    # ===== LAST PAGE: Java API =====
    draw_api_page(pdf)

    out = '/home/luggels/Documents/java/java-learner/probeklausur-flugzeug-v2.pdf'
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
    air_x, air_y, air_w = 128, 18, 68
    et_x, et_y, et_w = 250, 18, 42

    # Row 1: Base class (Row) + Interface (Boardable)
    row_x, row_y, row_w = 20, 58, 80
    board_x, board_y, board_w = 195, 64, 46

    # Row 2: Subclasses + Implementations
    fc_x, fc_y, fc_w = 6, 116, 76
    er_x, er_y, er_w = 90, 116, 64
    pass_x, pass_y, pass_w = 168, 116, 64
    crew_x, crew_y, crew_w = 244, 116, 48

    # Row 3: Exception + Enum
    exc_x, exc_y, exc_w = 18, 162, 66
    st_x, st_y, st_w = 174, 158, 54

    # ================================================================
    # DRAW ALL BOXES
    # ================================================================

    air_h = pdf.uml_box(air_x, air_y, air_w,
        'Airplane', '',
        ['+rows: List<Row> { final }'],
        ['+Airplane(numberOfRows: int,',
         '  seatsPerRow: int)',
         '+board(item: Boardable): boolean'],
        lh=LH, font_sz=FS)

    pdf.uml_box(et_x, et_y, et_w,
        'ExamTask', '',
        [],
        ['+ main(args: String[]): void [U]'],
        lh=LH, font_sz=FS)

    row_h = pdf.uml_box(row_x, row_y, row_w,
        'Row', '',
        ['+number: int { final }',
         '+maxPassengers: int { final }',
         '-passengers: List<Boardable>'],
        ['+Row(number: int,',
         '  maxPassengers: int)',
         '#getNextLetter(): char',
         '#isFull(): boolean',
         '#add(item: Boardable): void'],
        lh=LH, font_sz=FS)

    board_h = pdf.uml_box(board_x, board_y, board_w,
        'Boardable', '\u00ABinterface\u00BB',
        [],
        ['+getName(): String'],
        lh=LH, font_sz=FS)

    fc_h = pdf.uml_box(fc_x, fc_y, fc_w,
        'FirstClassRow', '',
        ['-MIN_CREW: int {final} = 2 [U]',
         '-assignedCrew: int'],
        ['+FirstClassRow(number: int,',
         '  maxPassengers: int,',
         '  assignedCrew: int)',
         '+add(item: Boardable): void'],
        lh=LH, font_sz=FS)

    er_h = pdf.uml_box(er_x, er_y, er_w,
        'EmergencyRow', '',
        [],
        ['+EmergencyRow(maxPsgrs: int)',
         '+add(item: Boardable): void'],
        lh=LH, font_sz=FS)

    pass_h = pdf.uml_box(pass_x, pass_y, pass_w,
        'Passenger', '',
        ['+name: String { final }',
         '+age: int { final }',
         '+seatType: SeatType { final }'],
        ['+Passenger(name: String,',
         '  age: int, seatType: SeatType)',
         '+getName(): String'],
        lh=LH, font_sz=FS)

    crew_h = pdf.uml_box(crew_x, crew_y, crew_w,
        'FlightCrew', '',
        ['+name: String { final }'],
        ['+FlightCrew(name: String)',
         '+getName(): String'],
        lh=LH, font_sz=FS)

    exc_h = pdf.uml_box(exc_x, exc_y, exc_w,
        'Exception', '',
        [],
        ['+getMessage(): String'],
        lh=LH, font_sz=FS)

    st_h = pdf.uml_box(st_x, st_y, st_w,
        'SeatType', '\u00ABenumeration\u00BB',
        ['Window,',
         'Aisle,',
         'Middle;',
         '',
         '-value: char'],
        ['+SeatType(value: char)',
         '+getValue(): char',
         '+isPreferred(): boolean'],
        lh=LH, font_sz=FS)

    # ================================================================
    # COMPUTED BOTTOMS
    # ================================================================
    air_bot = air_y + air_h
    row_bot = row_y + row_h
    board_bot = board_y + board_h
    fc_bot = fc_y + fc_h
    er_bot = er_y + er_h
    pass_bot = pass_y + pass_h

    # ================================================================
    # CONNECTION 1: Airplane --<>--> Row (composition)
    # Diamond at Airplane bottom, orthogonal route to Row top
    # ================================================================
    dia_x = air_x + 12
    dia_h = pdf.draw_open_diamond(dia_x, air_bot, w=2.5, h=4)
    dia_bot = air_bot + dia_h
    row_conn_x = row_x + row_w * 0.75
    mid_y1 = dia_bot + 2
    pdf.draw_ortho([
        (dia_x, dia_bot),
        (dia_x, mid_y1),
        (row_conn_x, mid_y1),
        (row_conn_x, row_y),
    ])

    # ================================================================
    # CONNECTION 2: Row --<>--> Boardable (composition, horizontal)
    # ================================================================
    assoc_y = row_y + row_h * 0.35
    dia2_h = pdf.draw_open_diamond(row_x + row_w, assoc_y,
                                    w=2.5, h=4, direction='right')
    pdf.draw_ortho([
        (row_x + row_w + dia2_h, assoc_y),
        (board_x, assoc_y),
    ])

    # ================================================================
    # CONNECTION 3: FirstClassRow --> Row (extends)
    # ================================================================
    tri_x3 = row_x + row_w * 0.25
    tri_h3 = pdf.draw_open_triangle(tri_x3, row_bot, size=2.2)
    tri_base3 = row_bot + tri_h3
    fc_top_x = fc_x + fc_w / 2
    mid_y3 = tri_base3 + 2
    pdf.draw_ortho([
        (fc_top_x, fc_y),
        (fc_top_x, mid_y3),
        (tri_x3, mid_y3),
        (tri_x3, tri_base3),
    ])
    pdf.draw_label(fc_top_x - 18, mid_y3 - 3.5, 'extends')

    # ================================================================
    # CONNECTION 4: EmergencyRow --> Row (extends)
    # ================================================================
    tri_x4 = row_x + row_w * 0.75
    tri_h4 = pdf.draw_open_triangle(tri_x4, row_bot, size=2.2)
    tri_base4 = row_bot + tri_h4
    er_top_x = er_x + er_w / 2
    mid_y4 = tri_base4 + 2
    pdf.draw_ortho([
        (er_top_x, er_y),
        (er_top_x, mid_y4),
        (tri_x4, mid_y4),
        (tri_x4, tri_base4),
    ])
    pdf.draw_label(er_top_x - 4, mid_y4 - 3.5, 'extends')

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
    # CONNECTION 6: FlightCrew --> Boardable (implements)
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
    # CONNECTION 7: Passenger --<>--> SeatType (composition)
    # ================================================================
    dia7_x = pass_x + pass_w * 0.4
    dia7_h = pdf.draw_open_diamond(dia7_x, pass_bot, w=2, h=3.5)
    dia7_bot = pass_bot + dia7_h
    st_top_x = st_x + st_w / 2
    mid_y7 = dia7_bot + 1.5
    pdf.draw_ortho([
        (dia7_x, dia7_bot),
        (dia7_x, mid_y7),
        (st_top_x, mid_y7),
        (st_top_x, st_y),
    ])

    # ================================================================
    # CONNECTION 8: Row --throws--> Exception (routed along left edge)
    # ================================================================
    row_throw_y = row_y + row_h * 0.8
    left_route_x = 3
    exc_left = exc_x
    exc_mid_y = exc_y + 5
    pdf.draw_ortho([
        (row_x, row_throw_y),
        (left_route_x, row_throw_y),
        (left_route_x, exc_mid_y),
        (exc_left, exc_mid_y),
    ])
    pdf.draw_label(left_route_x + 1, exc_mid_y - 8, 'throws')

    # ================================================================
    # CONNECTION 9: FirstClassRow --throws--> Exception
    # ================================================================
    fc_throw_x = fc_x + 12
    exc_top_l = exc_x + exc_w * 0.35
    throws_mid_y = exc_y - 5
    pdf.draw_ortho([
        (fc_throw_x, fc_bot),
        (fc_throw_x, throws_mid_y),
        (exc_top_l, throws_mid_y),
        (exc_top_l, exc_y),
    ])
    pdf.draw_label(fc_throw_x + 2, throws_mid_y - 3.5, 'throws')

    # ================================================================
    # CONNECTION 10: EmergencyRow --throws--> Exception
    # ================================================================
    er_throw_x = er_x + 12
    exc_top_r = exc_x + exc_w * 0.7
    pdf.draw_ortho([
        (er_throw_x, er_bot),
        (er_throw_x, throws_mid_y),
        (exc_top_r, throws_mid_y),
        (exc_top_r, exc_y),
    ])
    pdf.draw_label(er_throw_x - 14, er_bot + 2, 'throws')

    pdf.set_auto_page_break(auto=True, margin=25)


def draw_hints_pages(pdf):
    """Pages 4-6: Implementation hints."""

    # ===== PAGE 4: Boardable, SeatType, Passenger, Row =====
    pdf.add_page('P')

    pdf.subsection_title('Hinweise zur Klasse Boardable (Einsteigefaehig)')
    pdf.bullet_method_text('getName',
        'soll den Namen zurueckgeben.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse SeatType (Sitztyp)')
    pdf.bullet_method_text('getValue',
        'soll den Wert (value) des Sitztyps zurueckgeben.')
    pdf.bullet_method_text('isPreferred',
        'soll true zurueckgeben, wenn der Sitztyp '
        'bevorzugt ist.')
    pdf.indent_text(
        'Ein Sitztyp ist bevorzugt, sofern es kein '
        'Mittel-Sitz (Middle) ist.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse Passenger (Passagier)')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.bullet_method_text('getName',
        'soll den Namen zurueckgeben.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse Row (Reihe)')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.bullet_method_text('getNextLetter',
        'soll den Buchstaben des naechsten freien Platzes berechnen.')
    pdf.indent_text(
        'Der erste Platz hat den Buchstaben A, der zweite B, '
        'der dritte C und so weiter.')
    pdf.bullet_method_text('isFull',
        'soll ermitteln, ob die Reihe voll belegt ist.')
    pdf.indent_text(
        'Eine Reihe ist voll, sobald die Anzahl der Passagiere '
        'die maximale Anzahl (maxPassengers) erreicht hat.')
    pdf.bullet_method_text('add',
        'soll versuchen einen Passagier in der Reihe zu platzieren.')
    pdf.indent_text(
        'Ist die Reihe nicht voll, soll die Platzierung (Reihe und '
        'Buchstabe) auf der Konsole ausgegeben und der Passagier '
        'hinzugefuegt werden. Andernfalls soll ein Fehler '
        'ausgeloest werden, dass die Reihe voll ist.')
    pdf.ln(3)

    # ===== PAGE 5: FirstClassRow, EmergencyRow =====
    pdf.add_page('P')

    pdf.subsection_title('Hinweise zur Klasse FirstClassRow')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.indent_text(
        'Die First-Class-Reihe hat breitere Sitze und somit 2 Plaetze '
        'weniger als die maximale Anzahl.')
    pdf.bullet_method_text('add',
        'soll versuchen, einen Passagier in der First-Class-Reihe '
        'zu platzieren.')
    pdf.indent_text(
        'Nur Flugbesatzung (FlightCrew) darf in der First-Class-Reihe '
        'platziert werden. Ist die zugewiesene Besatzung '
        '(assignedCrew) kleiner als die Mindestanzahl (MIN_CREW), '
        'darf niemand platziert werden.')
    pdf.indent_text(
        'Kann der Passagier nicht platziert werden, soll ein Fehler '
        'ausgeloest werden, dass nur Crew in der First Class '
        'erlaubt ist.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse EmergencyRow (Notausgangreihe)')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.indent_text(
        'Die Notausgangreihe soll immer in der untersten Reihe sein '
        '(Reihe 1).')
    pdf.bullet_method_text('add',
        'soll versuchen, einen Passagier in der Notausgangreihe '
        'zu platzieren.')
    pdf.indent_text(
        'Nur Passagiere (Passenger) deren Sitztyp bevorzugt ist, '
        'duerfen in der Notausgangreihe platziert werden.')
    pdf.indent_text(
        'Kann der Passagier nicht platziert werden, soll ein Fehler '
        'ausgeloest werden, dass nur Passagiere mit bevorzugtem '
        'Sitztyp erlaubt sind.')
    pdf.ln(3)

    # ===== PAGE 6: Airplane, ExamTask =====
    pdf.add_page('P')

    pdf.subsection_title('Hinweise zur Klasse Airplane (Flugzeug)')
    pdf.bullet_bold_rest('Konstruktor', ' soll alle Attribute initialisieren.')
    pdf.indent_text(
        'Jedes Flugzeug hat mehrere Reihen. Es gibt jedoch immer genau '
        'eine First-Class-Reihe und eine Notausgangreihe. Der Konstruktor '
        'soll nach der Initialisierung aller Attribute zuerst die '
        'First-Class-Reihe, dann die Notausgangreihe und anschliessend '
        'die normalen Reihen erzeugen und der internen Liste hinzufuegen.')
    pdf.indent_text(
        'Die normalen Reihen werden in einem Loop erzeugt '
        '(Reihennummern absteigend). '
        'Die Notausgangreihe hat immer die geringste Reihe (Reihe 1) und '
        'die First-Class-Reihe immer die hoechste Reihe. Die '
        'First-Class-Reihe hat 4 zugewiesene Crew-Mitglieder '
        '(assignedCrew).')

    pdf.ln(1)
    pdf.indent_italic(
        'Beispiel Liste mit numberOfRows = 3 und seatsPerRow = 3:')

    pdf.code_block([
        '- FirstClassRow  - Reihe = 5, max. 1 Passagier (3-2)',
        '- EmergencyRow   - Reihe = 1, max. 3 Passagiere',
        '- normale Reihe  - Reihe = 4, max. 3 Passagiere',
        '- normale Reihe  - Reihe = 3, max. 3 Passagiere',
        '- normale Reihe  - Reihe = 2, max. 3 Passagiere',
    ])

    pdf.indent_italic(
        'Wenn ein Passagier platziert wird, erhaelt er automatisch '
        'den naechsten freien Buchstaben (A, B, C, ...).')

    pdf.ln(2)
    pdf.bullet_method_text('board',
        'soll einen Passagier platzieren und zurueckgeben, '
        'ob es funktioniert hat.')
    pdf.indent_text(
        'Versuche einen Platz fuer den Passagier im Flugzeug zu finden, '
        'indem ueber alle Reihen iteriert wird. '
        'Wenn ein Platz gefunden wurde, soll true zurueckgegeben werden.')
    pdf.indent_text(
        'Wenn der Passagier in einer Reihe nicht platziert werden konnte, '
        'soll die Fehlermeldung auf der Konsole ausgegeben und die '
        'naechste Reihe versucht werden.')
    pdf.indent_text(
        'Konnte der Passagier in keiner Reihe platziert werden, '
        'soll false zurueckgegeben werden.')
    pdf.ln(3)

    pdf.subsection_title('Hinweise zur Klasse ExamTask')
    pdf.indent_text(
        'Es soll ein Flugzeug mit 4 Reihen und 3 Sitzen pro Reihe '
        'erstellt werden.')
    pdf.indent_text(
        'Erstelle ein Flugbesatzungsmitglied mit einem Namen deiner Wahl '
        'und versuche es im Flugzeug zu platzieren.')
    pdf.indent_text(
        'Iteriere ueber alle Sitztypen. Erstelle fuer jeden '
        'Sitztyp einen Passagier mit einem Alter von 25 '
        'und versuche ihn im Flugzeug zu platzieren. '
        'Verwende den Wert (getValue) des Sitztyps im Namen '
        'des Passagiers.')
    pdf.indent_text(
        'Falls kein Platz gefunden wurde, soll dies zusammen mit dem '
        'Wert des Sitztyps auf der Konsole ausgegeben werden.')


def draw_api_page(pdf):
    """Last page: Java API reference."""
    pdf.add_page('P')
    pdf.section_title('Java API', 15)
    pdf.ln(2)

    api_data = [
        ('SeatType', 'values()', 'X', 'SeatType[]'),
        ('SeatType', 'name()', '', 'String'),
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
