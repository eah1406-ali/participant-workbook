/* ========================================

   تصدير دفتر المشارك إلى PDF
   تستخدمه صفحة المشارك ولوحة المدرب.
   يعتمد على workbook-content.js

   يُطبع الدفتر بمحرك المتصفح نفسه (حفظ بتنسيق PDF)،
   لأن مكتبات التحويل إلى صورة تُفسد النص العربي:
   تدمج الكلمات وتقلب علامات الترقيم والأرقام.

======================================== */


// دفتر فارغ بصيغة PDF منشور مع الموقع، ورمز QR ثابت يشير إليه
// (يُعاد توليد الرمز إذا تغير الرابط)

const blankWorkbookUrl =

  "https://eah1406-ali.github.io/participant-workbook/blank-workbook.pdf";


const blankWorkbookQr =

  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" shape-rendering="crispEdges"><rect width="41" height="41" fill="#fff"/><path fill="#233140" d="M2 2h7v1h-7zM12 2h5v1h-5zM20 2h1v1h-1zM22 2h2v1h-2zM25 2h1v1h-1zM27 2h1v1h-1zM30 2h1v1h-1zM32 2h7v1h-7zM2 3h1v1h-1zM8 3h1v1h-1zM12 3h2v1h-2zM15 3h1v1h-1zM17 3h2v1h-2zM21 3h1v1h-1zM23 3h2v1h-2zM26 3h1v1h-1zM28 3h3v1h-3zM32 3h1v1h-1zM38 3h1v1h-1zM2 4h1v1h-1zM4 4h3v1h-3zM8 4h1v1h-1zM10 4h1v1h-1zM12 4h2v1h-2zM20 4h5v1h-5zM26 4h1v1h-1zM28 4h1v1h-1zM30 4h1v1h-1zM32 4h1v1h-1zM34 4h3v1h-3zM38 4h1v1h-1zM2 5h1v1h-1zM4 5h3v1h-3zM8 5h1v1h-1zM10 5h2v1h-2zM13 5h2v1h-2zM16 5h1v1h-1zM18 5h2v1h-2zM21 5h2v1h-2zM24 5h1v1h-1zM27 5h3v1h-3zM32 5h1v1h-1zM34 5h3v1h-3zM38 5h1v1h-1zM2 6h1v1h-1zM4 6h3v1h-3zM8 6h1v1h-1zM10 6h9v1h-9zM20 6h4v1h-4zM25 6h1v1h-1zM27 6h1v1h-1zM32 6h1v1h-1zM34 6h3v1h-3zM38 6h1v1h-1zM2 7h1v1h-1zM8 7h1v1h-1zM10 7h1v1h-1zM13 7h3v1h-3zM20 7h1v1h-1zM23 7h2v1h-2zM26 7h4v1h-4zM32 7h1v1h-1zM38 7h1v1h-1zM2 8h7v1h-7zM10 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM18 8h1v1h-1zM20 8h1v1h-1zM22 8h1v1h-1zM24 8h1v1h-1zM26 8h1v1h-1zM28 8h1v1h-1zM30 8h1v1h-1zM32 8h7v1h-7zM10 9h3v1h-3zM21 9h1v1h-1zM23 9h1v1h-1zM26 9h1v1h-1zM28 9h1v1h-1zM30 9h1v1h-1zM2 10h1v1h-1zM4 10h5v1h-5zM11 10h1v1h-1zM13 10h1v1h-1zM16 10h1v1h-1zM20 10h1v1h-1zM22 10h1v1h-1zM24 10h2v1h-2zM27 10h4v1h-4zM32 10h5v1h-5zM2 11h1v1h-1zM5 11h1v1h-1zM7 11h1v1h-1zM10 11h4v1h-4zM15 11h5v1h-5zM23 11h1v1h-1zM25 11h1v1h-1zM28 11h1v1h-1zM30 11h1v1h-1zM33 11h1v1h-1zM35 11h1v1h-1zM37 11h1v1h-1zM2 12h3v1h-3zM6 12h1v1h-1zM8 12h1v1h-1zM13 12h4v1h-4zM20 12h1v1h-1zM22 12h1v1h-1zM26 12h1v1h-1zM29 12h10v1h-10zM2 13h3v1h-3zM7 13h1v1h-1zM10 13h3v1h-3zM14 13h2v1h-2zM18 13h1v1h-1zM23 13h1v1h-1zM25 13h1v1h-1zM28 13h7v1h-7zM38 13h1v1h-1zM3 14h2v1h-2zM7 14h2v1h-2zM11 14h3v1h-3zM15 14h1v1h-1zM19 14h1v1h-1zM22 14h1v1h-1zM25 14h4v1h-4zM30 14h3v1h-3zM34 14h5v1h-5zM2 15h3v1h-3zM6 15h1v1h-1zM9 15h2v1h-2zM15 15h2v1h-2zM19 15h5v1h-5zM25 15h1v1h-1zM33 15h1v1h-1zM37 15h1v1h-1zM2 16h2v1h-2zM6 16h3v1h-3zM10 16h1v1h-1zM12 16h1v1h-1zM14 16h2v1h-2zM17 16h1v1h-1zM19 16h1v1h-1zM22 16h1v1h-1zM24 16h1v1h-1zM26 16h2v1h-2zM29 16h1v1h-1zM32 16h4v1h-4zM37 16h2v1h-2zM4 17h1v1h-1zM9 17h1v1h-1zM12 17h1v1h-1zM15 17h6v1h-6zM23 17h1v1h-1zM29 17h1v1h-1zM33 17h2v1h-2zM37 17h1v1h-1zM3 18h1v1h-1zM8 18h4v1h-4zM13 18h2v1h-2zM16 18h3v1h-3zM23 18h1v1h-1zM26 18h4v1h-4zM31 18h2v1h-2zM34 18h1v1h-1zM36 18h2v1h-2zM2 19h6v1h-6zM10 19h3v1h-3zM15 19h3v1h-3zM20 19h1v1h-1zM22 19h1v1h-1zM25 19h3v1h-3zM35 19h3v1h-3zM2 20h1v1h-1zM4 20h7v1h-7zM13 20h3v1h-3zM17 20h5v1h-5zM24 20h1v1h-1zM28 20h3v1h-3zM32 20h3v1h-3zM36 20h3v1h-3zM2 21h1v1h-1zM5 21h3v1h-3zM10 21h1v1h-1zM13 21h1v1h-1zM15 21h3v1h-3zM21 21h3v1h-3zM25 21h2v1h-2zM31 21h2v1h-2zM34 21h1v1h-1zM38 21h1v1h-1zM4 22h1v1h-1zM6 22h3v1h-3zM10 22h2v1h-2zM15 22h5v1h-5zM21 22h1v1h-1zM24 22h2v1h-2zM27 22h2v1h-2zM30 22h3v1h-3zM34 22h3v1h-3zM3 23h1v1h-1zM6 23h1v1h-1zM15 23h2v1h-2zM18 23h1v1h-1zM20 23h3v1h-3zM25 23h1v1h-1zM27 23h1v1h-1zM35 23h1v1h-1zM3 24h1v1h-1zM6 24h1v1h-1zM8 24h1v1h-1zM10 24h3v1h-3zM14 24h1v1h-1zM17 24h1v1h-1zM20 24h1v1h-1zM24 24h1v1h-1zM27 24h1v1h-1zM29 24h1v1h-1zM31 24h1v1h-1zM33 24h3v1h-3zM37 24h2v1h-2zM2 25h1v1h-1zM4 25h2v1h-2zM7 25h1v1h-1zM9 25h3v1h-3zM13 25h2v1h-2zM16 25h1v1h-1zM18 25h1v1h-1zM26 25h1v1h-1zM28 25h3v1h-3zM32 25h3v1h-3zM37 25h1v1h-1zM2 26h1v1h-1zM4 26h1v1h-1zM7 26h2v1h-2zM10 26h1v1h-1zM14 26h1v1h-1zM20 26h1v1h-1zM22 26h8v1h-8zM31 26h2v1h-2zM34 26h1v1h-1zM36 26h3v1h-3zM2 27h1v1h-1zM5 27h2v1h-2zM11 27h1v1h-1zM13 27h1v1h-1zM16 27h4v1h-4zM25 27h1v1h-1zM27 27h1v1h-1zM30 27h1v1h-1zM33 27h1v1h-1zM35 27h1v1h-1zM2 28h1v1h-1zM4 28h2v1h-2zM7 28h2v1h-2zM10 28h3v1h-3zM20 28h1v1h-1zM22 28h2v1h-2zM29 28h1v1h-1zM33 28h6v1h-6zM2 29h1v1h-1zM6 29h2v1h-2zM9 29h1v1h-1zM11 29h3v1h-3zM15 29h2v1h-2zM18 29h1v1h-1zM23 29h3v1h-3zM28 29h1v1h-1zM30 29h1v1h-1zM32 29h3v1h-3zM37 29h2v1h-2zM2 30h1v1h-1zM4 30h2v1h-2zM7 30h2v1h-2zM10 30h2v1h-2zM14 30h3v1h-3zM19 30h1v1h-1zM22 30h1v1h-1zM24 30h4v1h-4zM30 30h9v1h-9zM10 31h3v1h-3zM16 31h1v1h-1zM18 31h2v1h-2zM21 31h3v1h-3zM25 31h1v1h-1zM30 31h1v1h-1zM34 31h2v1h-2zM37 31h1v1h-1zM2 32h7v1h-7zM12 32h2v1h-2zM15 32h5v1h-5zM22 32h2v1h-2zM27 32h1v1h-1zM30 32h1v1h-1zM32 32h1v1h-1zM34 32h1v1h-1zM36 32h3v1h-3zM2 33h1v1h-1zM8 33h1v1h-1zM10 33h4v1h-4zM17 33h1v1h-1zM19 33h7v1h-7zM29 33h2v1h-2zM34 33h2v1h-2zM37 33h2v1h-2zM2 34h1v1h-1zM4 34h3v1h-3zM8 34h1v1h-1zM10 34h2v1h-2zM14 34h5v1h-5zM21 34h1v1h-1zM23 34h1v1h-1zM26 34h9v1h-9zM36 34h2v1h-2zM2 35h1v1h-1zM4 35h3v1h-3zM8 35h1v1h-1zM10 35h1v1h-1zM12 35h3v1h-3zM17 35h1v1h-1zM20 35h1v1h-1zM22 35h1v1h-1zM24 35h2v1h-2zM27 35h1v1h-1zM32 35h1v1h-1zM34 35h1v1h-1zM36 35h1v1h-1zM38 35h1v1h-1zM2 36h1v1h-1zM4 36h3v1h-3zM8 36h1v1h-1zM10 36h2v1h-2zM14 36h2v1h-2zM17 36h2v1h-2zM20 36h2v1h-2zM24 36h1v1h-1zM27 36h3v1h-3zM31 36h1v1h-1zM36 36h3v1h-3zM2 37h1v1h-1zM8 37h1v1h-1zM11 37h4v1h-4zM17 37h1v1h-1zM20 37h6v1h-6zM29 37h2v1h-2zM32 37h1v1h-1zM34 37h1v1h-1zM38 37h1v1h-1zM2 38h7v1h-7zM10 38h1v1h-1zM13 38h1v1h-1zM17 38h1v1h-1zM19 38h1v1h-1zM21 38h1v1h-1zM25 38h4v1h-4zM31 38h2v1h-2zM34 38h5v1h-5z"/></svg>';


const scaleLabels = [

  "نادرًا",

  "قليلًا",

  "أحيانًا",

  "غالبًا",

  "دائمًا"

];


const pdfStyles = `

  @page {
    size: A4;
    margin: 14mm 13mm 16mm;

    @bottom-center {
      content: "صفحة " counter(page) " من " counter(pages);
      font-family: Tajawal, sans-serif;
      font-size: 9pt;
      color: #8A8F96;
    }
  }

  #workbookPrint {
    display: none;
  }

  @media print {

    body > *:not(#workbookPrint) {
      display: none !important;
    }

    body {
      background: white !important;
      margin: 0 !important;
    }

    #workbookPrint {
      display: block;
    }

  }

  .wb-pdf {
    direction: rtl;
    font-family: Tajawal, sans-serif;
    color: #27313D;
    font-size: 11pt;
    line-height: 1.7;
    background: white;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .wb-pdf * {
    box-sizing: border-box;
  }

  .wb-pdf .avoid {
    break-inside: avoid;
  }

  .wb-pdf h2,
  .wb-pdf h3 {
    break-after: avoid;
  }

  .wb-pdf .cover {
    background: #233140;
    color: white;
    border-radius: 14px;
    padding: 20px 22px;
    margin-bottom: 18px;
  }

  .wb-pdf .cover small {
    color: #D9CCB7;
    font-weight: 700;
    font-size: 12px;
  }

  .wb-pdf .cover h1 {
    margin: 4px 0 2px;
    font-size: 24px;
    line-height: 1.4;
  }

  .wb-pdf .cover .meta {
    color: #E7DFD5;
    font-size: 12px;
  }

  .wb-pdf h2 {
    color: #2F4053;
    font-size: 17px;
    margin: 0 0 2px;
    padding-bottom: 6px;
    border-bottom: 2px solid #7B6F5A;
  }

  .wb-pdf h3 {
    color: #2F4053;
    font-size: 14px;
    margin: 14px 0 6px;
  }

  .wb-pdf .section {
    margin-top: 22px;
  }

  .wb-pdf .help {
    color: #6B7280;
    font-size: 12px;
    margin: 4px 0 8px;
  }

  .wb-pdf .field {
    margin: 8px 0;
  }

  .wb-pdf .field b {
    display: block;
    color: #2F4053;
    font-size: 12.5px;
  }

  .wb-pdf .answer {
    background: #F4F1EC;
    border-radius: 8px;
    padding: 7px 11px;
    margin-top: 3px;
    white-space: pre-wrap;
  }

  .wb-pdf .answer.empty {
    color: #9CA3AF;
  }

  .wb-pdf .summary {
    display: flex;
    gap: 10px;
    margin: 10px 0;
  }

  .wb-pdf .total {
    background: #2F4053;
    color: white;
    border-radius: 10px;
    padding: 10px 16px;
    text-align: center;
    min-width: 130px;
  }

  .wb-pdf .total strong {
    display: block;
    font-size: 24px;
    line-height: 1.3;
  }

  .wb-pdf .extremes {
    flex: 1;
    background: #F4F1EC;
    border-radius: 10px;
    padding: 10px 14px;
  }

  .wb-pdf .row {
    display: flex;
    border-bottom: 1px solid #E5E7EB;
  }

  .wb-pdf .row > div {
    padding: 6px 8px;
  }

  .wb-pdf .row.head {
    background: #2F4053;
    font-weight: 700;
    border-radius: 8px 8px 0 0;
    break-after: avoid;
  }

  .wb-pdf .row.head > div {
    color: white;
  }

  .wb-pdf .row.group {
    break-after: avoid;
  }

  .wb-pdf .row.group {
    background: #F4F1EC;
    color: #2F4053;
    font-weight: 700;
  }

  .wb-pdf .c-dim { width: 17%; font-weight: 700; }
  .wb-pdf .c-score { width: 15%; }
  .wb-pdf .c-read { width: 28%; }
  .wb-pdf .c-do { width: 40%; color: #4B5563; }

  .wb-pdf .c-no { width: 7%; color: #7B6F5A; font-weight: 700; text-align: center; }
  .wb-pdf .c-text { width: 73%; }
  .wb-pdf .c-val { width: 20%; font-weight: 700; color: #2F4053; }

  .wb-pdf .bar {
    height: 6px;
    background: #E7E2DA;
    border-radius: 99px;
    overflow: hidden;
    margin-top: 3px;
  }

  .wb-pdf .bar span {
    display: block;
    height: 100%;
  }

  .wb-pdf .band-high { background: #2F4053; }
  .wb-pdf .band-mid { background: #A6947A; }
  .wb-pdf .band-low { background: #CBBFAE; }

  .wb-pdf .blank {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 18px;
    padding: 14px 16px;
    border: 1px solid #E5E7EB;
    border-right: 4px solid #7B6F5A;
    border-radius: 12px;
    background: #FAFAF8;
  }

  .wb-pdf .blank h3 {
    margin: 0 0 4px;
  }

  .wb-pdf .blank .qr svg {
    display: block;
    width: 32mm;
    height: 32mm;
  }

  .wb-pdf .blank .link {
    display: block;
    margin-top: 4px;
    color: #7B6F5A;
    font-size: 9pt;
    text-align: right;
    text-decoration: none;
  }

  .wb-pdf .note {
    margin-top: 22px;
    padding-top: 8px;
    border-top: 1px solid #E5E7EB;
    color: #6B7280;
    font-size: 11px;
  }

`;



/* ========================================

   بناء محتوى الدفتر

======================================== */


function scoreBand(score) {

  if (score >= 17) {
    return "band-high";
  }

  if (score >= 12) {
    return "band-mid";
  }

  return "band-low";

}



function answerBlock(label, value) {

  const text =
    String(value ?? "").trim();

  return `

    <div class="field avoid">

      <b>${escapeHtml(label)}</b>

      <div class="answer ${text ? "" : "empty"}">${text ? escapeHtml(text) : "لم تُكتب إجابة"}</div>

    </div>

  `;

}



function assessmentSection(answers) {

  const result =
    answers._result;

  const next =
    answers._next || {};


  const dimensionRows =

    result.dimensions

    .map(

      item => `

        <div class="row avoid">

          <div class="c-dim">${escapeHtml(item.name)}</div>

          <div class="c-score">

            ${item.score} من 20

            <div class="bar">
              <span
                class="${scoreBand(item.score)}"
                style="width:${(item.score / 20) * 100}%"
              ></span>
            </div>

          </div>

          <div class="c-read">${escapeHtml(item.label)}</div>

          <div class="c-do">${escapeHtml(item.advice)}</div>

        </div>

      `

    )

    .join("");


  let answerRows = "";

  assessmentQuestions.forEach(

    (question, index) => {

      if (index % 4 === 0) {

        answerRows += `

          <div class="row group avoid">

            <div>
              البعد ${dimensionOrdinals[index / 4]}:
              ${dimensionNames[index / 4]}
            </div>

          </div>

        `;

      }

      const value =
        Number(answers["q" + (index + 1)]);

      answerRows += `

        <div class="row avoid">

          <div class="c-no">${index + 1}</div>

          <div class="c-text">${escapeHtml(question)}</div>

          <div class="c-val">
            ${value ? value + " — " + scaleLabels[value - 1] : "—"}
          </div>

        </div>

      `;

    }

  );


  return `

    <div class="section">

      <div class="avoid">

        <h2>المهمة الأولى: استبانة رشاقة الأداء الفردية</h2>

        <div class="summary">

          <div class="total">
            <strong>${result.total} من 80</strong>
            المجموع الكلي
          </div>

          <div class="extremes">
            <b>أقوى بُعد:</b> ${escapeHtml(result.strongest)}
            <br>
            <b>أضعف بُعد:</b> ${escapeHtml(result.weakest)}
          </div>

        </div>

      </div>


      <div class="row head avoid">
        <div class="c-dim">البعد</div>
        <div class="c-score">الدرجة</div>
        <div class="c-read">القراءة</div>
        <div class="c-do">ماذا تفعل؟</div>
      </div>

      ${dimensionRows}


      <div class="avoid">

        <h3>خطوتي التالية</h3>

        ${answerBlock(
          "أصغر تحسين سأجربه فيه خلال أسبوعين",
          next.improvement
        )}

      </div>

      ${answerBlock(
        "كيف سأعرف أنه نجح؟",
        next.measure
      )}


      <h3 class="avoid">إجاباتي في الاستبانة</h3>

      <div class="row head avoid">
        <div class="c-no">م</div>
        <div class="c-text">العبارة</div>
        <div class="c-val">إجابتي</div>
      </div>

      ${answerRows}

    </div>

  `;

}



function activitySection(activityId, answers) {

  const definition =
    activityDefinitions[activityId];

  if (!definition) {
    return "";
  }

  const fields =

    definition.fields.map(

      field =>

        answerBlock(
          field[1],
          answers?.[field[0]]
        )

    );


  // العنوان يبقى مع أول إجابة في الصفحة نفسها

  return `

    <div class="section">

      <div class="avoid">

        <h2>النشاط ${activityId}: ${escapeHtml(definition.title)}</h2>

        <div class="help">${escapeHtml(definition.help)}</div>

        ${fields[0] || ""}

      </div>

      ${fields.slice(1).join("")}

    </div>

  `;

}



function buildWorkbookHtml(participant, responses) {

  const byActivity = {};

  (responses || []).forEach(

    response => {

      byActivity[
        Number(response.activity_id)
      ] = response.answers || {};

    }

  );


  const completed =
    Object.keys(byActivity).length;


  let sections = "";

  for (let id = 1; id <= 8; id++) {

    const answers =
      byActivity[id];

    if (!answers) {
      continue;
    }

    sections +=

      id === 1 && answers._result

      ? assessmentSection(answers)

      : activitySection(id, answers);

  }


  if (!sections) {

    sections = `
      <p class="help">لا توجد أنشطة محفوظة في هذا الدفتر بعد.</p>
    `;

  }


  const today =

    new Date().toLocaleDateString(
      "ar-SA-u-nu-latn-ca-gregory",
      { year: "numeric", month: "long", day: "numeric" }
    );


  return `

    <div class="wb-pdf">

      <div class="cover">

        <small>
          دفتر المشارك · رشاقة الأداء المؤسسي في قطاع الأوقاف
        </small>

        <h1>${escapeHtml(participant?.name || "مشارك")}</h1>

        <div class="meta">
          ${escapeHtml(participant?.email || "")}
          ${participant?.email ? " · " : ""}
          أكمل ${completed} من 8 أنشطة
          · صدر في ${today}
        </div>

      </div>

      ${sections}

      <div class="note">
        <b>تنبيه منهجي:</b>
        ${escapeHtml(methodNote)}
      </div>

      <div class="blank avoid">

        <div class="qr">${blankWorkbookQr}</div>

        <div>

          <h3>دفتر فارغ للطباعة</h3>

          امسح الرمز لتنزيل نسخة فارغة من دفتر المشارك بصيغة PDF،
          لتطبّق أدوات اللقاء مرة أخرى على مواقف جديدة، أو تشاركها مع زملائك.

          <a class="link" href="${blankWorkbookUrl}" dir="ltr">${blankWorkbookUrl}</a>

        </div>

      </div>

    </div>

  `;

}



/* ========================================

   التنزيل: نافذة الطباعة مع «حفظ بتنسيق PDF»

======================================== */


function pdfFileName(participant) {

  const name =

    String(participant?.name || "مشارك")

    .replace(/[\\/:*?"<>|]+/g, " ")

    .trim();

  return "دفتر المشارك - " + name;

}



async function downloadWorkbookPdf(participant, responses) {


  document.getElementById("workbookPrintStyle")?.remove();

  document.getElementById("workbookPrint")?.remove();


  const style =
    document.createElement("style");

  style.id =
    "workbookPrintStyle";

  style.textContent =
    pdfStyles;


  const area =
    document.createElement("div");

  area.id =
    "workbookPrint";

  area.innerHTML =

    buildWorkbookHtml(
      participant,
      responses
    );


  document.head.appendChild(style);

  document.body.appendChild(area);


  await document.fonts.ready;


  // عنوان الصفحة يصبح اسم ملف PDF المقترح

  const pageTitle =
    document.title;

  document.title =
    pdfFileName(participant);


  const cleanUp = () => {

    document.title =
      pageTitle;

    style.remove();

    area.remove();

  };


  window.addEventListener(
    "afterprint",
    cleanUp,
    { once: true }
  );


  window.print();

}