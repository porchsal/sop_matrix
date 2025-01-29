import formatDateTimeForSQL from '/src/helpers/formatDateTimeForSQL';


const PrintTraining = (training, trainer, empList) => {
    const printWindow = window.open("", "_blank");
    const logoUrl = "http://localhost:5173/logo.png";
    const img = new Image();
    img.src = logoUrl;
    img.onload = () => {
    printWindow.document.write(`
  <html>
    <head>
        <meta charset="utf-8">
        <table>
            <thead>
                <tr>
                    <th style="text-align: center; vertical-align: middle; padding: 0; margin: 0;">
                        <img src="${logoUrl}" alt="Logo" style="width: 140px; display: block; margin: 10px auto; padding: 0; ">
                    </th>
                    <th style="width: 40%; text-align: center; font-size: 12px; line-height: 1.2; ">
                        Group Training Session Attendance Sheet
                    </th>
                    <th style="
                        width: 40%; 
                        text-align: right; 
                        vertical-align: top; 
                        font-size: 12px; 
                        line-height: 1.2; ; 
                        white-space: pre-wrap;"
                        height: 6em;
                        display: inline-block;"
                        >
                        ${training.version}
                    </th>
                </tr>
            </thead>

                <title>Training Details</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                        }
                        h1 {
                            color: #333;
                            text-align: center;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f4f4f4;
                            font-weight: bold;
                        }
                        tr:nth-child(even) {
                            background-color: #f9f9f9;
                        }
                        img {
                            width: 150px;
                            height: auto;
                            margin: 20px auto;
                            display: block;
                        }
                        footer {
                            margin-top: 20px;
                            font-size: 0.8em;
                            text-align: justify;
                        }

                        /* Reglas para impresión */
                        @media print {
                            table {
                                page-break-inside: auto;
                            }
                            tr {
                                page-break-inside: avoid;
                                page-break-after: auto;
                            }
                            thead {
                                display: table-header-group;
                            }
                            tfoot {
                                display: table-footer-group;
                            }
                            img {
                                page-break-inside: avoid;
                            }
                        }
                    </style>
    </head>
    <body>
      <table>
        <thead>
            <tr>
                <th> Date of Training Session</th>
                <td>${formatDateTimeForSQL(training.training_date)}</td>
            </tr>
            <tr>
                <th> Area(s) of Training / SOP Number</th>
                <td>${training.sop_number}</td>
            </tr>
            <tr>
                <th> Training Session Name / SOP Title</th>
                <td>${training.sop_name}</td>
            </tr>
            <tr>
                <th> Qualified Trainer Name</th>
                <td>${trainer}</td>
            </tr>
            <tr>
                <th>Type of Training:</th>
                <td>${training.type_training}</td>
            </tr>
            <tr>
                <th>Change Control or Deviation Report Number:</th>
                <td>${training.control}</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th colspan="2" style="text-align: center; font-weight: bold; width: 100%;">
                    Description of training
                </th>
            </tr>
           <tr>
                <td colspan="2" style="border: 1px solid black; height: 300px; white-space: pre-wrap; vertical-align: top; ">${training.description}</td>
            </tr>
            <tr>
            <th>Training Assessment Required?:</th>
            <th>
                <label>
                    <input 
                    type="checkbox" 
                    ${training.assessment === 'Yes' ? 'checked' : ''}
                    readonly
                    />
                    Yes
                </label>
                <label>
                    <input 
                    type="checkbox" 
                    ${training.assessment === 'No' ? 'checked' : ''}
                    readonly
                    />
                    No
                </label>
            </th>
            </tr>
            <th style="width: 35%; " >Comments:</th>
            <td style="height: 100px; white-space: pre-wrap; vertical-align: top; width: 65%; ">${training.comments}</td>
        </tbody>
    </table>
      <table>
        <thead>
          <tr>
            <th>Employee Name Print</th>
            <th>Employee Signature</th>
          </tr>
        </thead>
            <tbody>
                ${empList
                    .map(
                        (employee) => `
                <tr style="page-break-inside: avoid;">
                    <td width="50%">${employee.name}</td>
                    <td width="50%"></td>
                </tr>
                `
                    )
                    .join("")}
            </tbody>
      </table>
    </body>
    <footer>
              <p>The employee’s signature certifies that the employee has either read the SOP listed or
                provided verbal training on the SOP listed and/or hands on training on the SOP listed and
                understands the materials and techniques required to perform the procedure. The employee
                addressed any questions to the area supervisor, or the qualified trainer and all issues were
                clearly understood.</p>
  </html>
    `);
        printWindow.document.close();
        printWindow.onload = () => {
            printWindow.print();
        };
    };
    img.onerror = () => {
        console.error("Error loading image");
    };

}

export default PrintTraining;
