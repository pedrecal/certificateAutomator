const path = require('path');
const HTML5ToPDF = require('html5-to-pdf');
const Intl = require('intl');

require('intl/locale-data/jsonp/pt-BR');

const newCert = async data => {
  const dateFormat = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const { fullNameCert, eventName, eventDate, workload, fullNameCoord, positionCoord } = data;
  const resultHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>A4 landscape</title>

    <!-- Normalize or reset CSS with your favorite library -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"
    />

    <!-- Load paper.css for happy printing -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.4.1/paper.css"
    />

    <!-- Set page size here: A5, A4 or A3 -->
    <!-- Set also "landscape" if you need -->
    <style>
      @page {
        size: A4 landscape;
      }
      .content {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 24px;
        text-align: justify;
      }
      .right {
        float: right;
      }
      .center {
        text-align: center;
      }
    </style>
  </head>

  <!-- Set "A5", "A4" or "A3" for class name -->
  <!-- Set also "landscape" if you need -->
  <body class="A4 landscape">
    <!-- Each sheet element should have the class "sheet" -->
    <!-- "padding-**mm" is optional: you can set 10, 15, 20 or 25 -->
    <section class="sheet padding-25mm">
      <img
        src="images/docs/uesc-cert.png"
        style="width: 250px;"
      />
      <img
        src="images/docs/broto-logo.jpg"
        style="width: 250px;"
        class="right"
      />
      <br />
      <br />
      <br />
      <br />
      <article class="content">
        <p>
          Certificamos que ${fullNameCert} participou da ${eventName}, realizado
          pela BROTO Incubadora de Biotecnologia na Universidade Estadual de
          Santa Cruz (UESC), no dia ${eventDate}, com carga horária de ${workload}
          horas.
        </p>
        <p class="right">Ilhéus, ${dateFormat.format(new Date())}.</p>
        <br />
        <br />
        <br />
        <div class="center" style="font-weight: bold;">
          <p style="margin-bottom: 0">${fullNameCoord}</p>
          <p style="margin-top: 0; font-size: 16px">${positionCoord}</p>
        </div>
      </article>
      <br />
      <br />
      <br />
      <br />
      <div class="center">
        <img
          src="images/docs/nit.png"
          style="width: 120px;"
        />
        <img
          src="images/docs/fapesb.png"
          style="width: 150px;"
        />
      </div>
    </section>
  </body>
</html>
`;

  const html5ToPDF = new HTML5ToPDF({
    inputBody: resultHTML,
    outputPath: path.join(__dirname, 'certificates', `${fullNameCert.split(' ').join('_')}_${eventName.split(' ').join('_')}.pdf`),
    templatePath: path.join(__dirname, 'public'),
    options: {
      pageSize: 'A4',
      landscape: true,
    },
  });

  await html5ToPDF.start();
  await html5ToPDF.build();
  await html5ToPDF.close();
};

module.exports = {newCert};
