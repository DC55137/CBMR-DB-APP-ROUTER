function emailMessage(job: { address: string }) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
      >
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <!--<![endif]-->
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="x-apple-disable-message-reformatting" />
          <title></title>
          <style type="text/css">
            @media screen {
              @font-face {
                font-family: "Fira Sans";
                font-style: normal;
                font-weight: 300;
                src: local(""),
                  url("https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruRA.woff2")
                    format("woff2"),
                  url("https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruQg.woff")
                    format("woff");
              }
              @font-face {
                font-family: "Fira Sans";
                font-style: normal;
                font-weight: 400;
                src: local(""),
                  url("https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VflQ.woff2")
                    format("woff2"),
                  url("https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vfkw.woff")
                    format("woff");
              }
              @font-face {
                font-family: "Fira Sans";
                font-style: normal;
                font-weight: 500;
                src: local(""),
                  url("https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuRA.woff2")
                    format("woff2"),
                  url("https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuQg.woff")
                    format("woff");
              }
              @font-face {
                font-family: "Fira Sans";
                font-style: normal;
                font-weight: 700;
                src: local(""),
                  url("https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uRA.woff2")
                    format("woff2"),
                  url("https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uQg.woff")
                    format("woff");
              }
              @font-face {
                font-family: "Fira Sans";
                font-style: normal;
                font-weight: 800;
                src: local(""),
                  url("https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uRA.woff2")
                    format("woff2"),
                  url("https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uQg.woff")
                    format("woff");
              }
            }
          </style>
          <style type="text/css">
            #outlook a {
              padding: 0;
            }
      
            .ReadMsgBody,
            .ExternalClass {
              width: 100%;
            }
      
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass td,
            .ExternalClass div,
            .ExternalClass span,
            .ExternalClass font {
              line-height: 100%;
            }
      
            div[style*="margin: 14px 0"],
            div[style*="margin: 16px 0"] {
              margin: 0 !important;
            }
      
            table,
            td {
              mso-table-lspace: 0;
              mso-table-rspace: 0;
            }
      
            table,
            tr,
            td {
              border-collapse: collapse;
            }
      
            body,
            td,
            th,
            p,
            div,
            li,
            a,
            span {
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              mso-line-height-rule: exactly;
            }
      
            img {
              border: 0;
              outline: none;
              line-height: 100%;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
      
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
            }
      
            body {
              margin: 0;
              padding: 0;
              width: 100% !important;
              -webkit-font-smoothing: antialiased;
            }
      
            .pc-gmail-fix {
              display: none;
              display: none !important;
            }
      
            @media screen and (min-width: 621px) {
              .pc-email-container {
                width: 620px !important;
              }
            }
          </style>
          <style type="text/css">
            @media screen and (max-width: 620px) {
              .pc-sm-p-24-20-30 {
                padding: 24px 20px 30px !important;
              }
              .pc-sm-p-20 {
                padding: 20px !important;
              }
              .pc-sm-p-35-10-15 {
                padding: 35px 10px 15px !important;
              }
              .pc-sm-mw-50pc {
                max-width: 50% !important;
              }
              .pc-sm-p-21-10-14 {
                padding: 21px 10px 14px !important;
              }
              .pc-sm-h-20 {
                height: 20px !important;
              }
              .pc-sm-mw-100pc {
                max-width: 100% !important;
              }
              .pc-sm-p-35-30 {
                padding: 35px 30px !important;
              }
            }
          </style>
          <style type="text/css">
            @media screen and (max-width: 525px) {
              .pc-xs-p-15-10-20 {
                padding: 15px 10px 20px !important;
              }
              .pc-xs-h-100 {
                height: 100px !important;
              }
              .pc-xs-br-disabled br {
                display: none !important;
              }
              .pc-xs-fs-30 {
                font-size: 30px !important;
              }
              .pc-xs-lh-42 {
                line-height: 42px !important;
              }
              .pc-xs-p-10 {
                padding: 10px !important;
              }
              .pc-xs-p-25-0-5 {
                padding: 25px 0 5px !important;
              }
              .pc-xs-mw-100pc {
                max-width: 100% !important;
              }
              .pc-xs-p-5-0 {
                padding: 5px 0 !important;
              }
              .pc-xs-p-25-20 {
                padding: 25px 20px !important;
              }
            }
          </style>
          <!--[if mso]>
            <style type="text/css">
              .pc-fb-font {
                font-family: Helvetica, Arial, sans-serif !important;
              }
            </style>
          <![endif]-->
          <!--[if gte mso 9
            ]><xml
              ><o:OfficeDocumentSettings
                ><o:AllowPNG /><o:PixelsPerInch
                  >96</o:PixelsPerInch
                ></o:OfficeDocumentSettings
              ></xml
            ><!
          [endif]-->
        </head>
        <body
          style="
            width: 100% !important;
            margin: 0;
            padding: 0;
            mso-line-height-rule: exactly;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            background-color: #f4f4f4;
          "
          class=""
        >
          <div
            style="
              display: none !important;
              visibility: hidden;
              opacity: 0;
              overflow: hidden;
              mso-hide: all;
              height: 0;
              width: 0;
              max-height: 0;
              max-width: 0;
              font-size: 1px;
              line-height: 1px;
              color: #151515;
            "
          >
            Thank you for the opportunity to quote your project.
          </div>
          <div
            style="
              display: none !important;
              visibility: hidden;
              opacity: 0;
              overflow: hidden;
              mso-hide: all;
              height: 0;
              width: 0;
              max-height: 0;
              max-width: 0;
              font-size: 1px;
              line-height: 1px;
            "
          >
            ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
          </div>
          <table
            class="pc-email-body"
            width="100%"
            bgcolor="white"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="table-layout: fixed"
          >
            <tbody>
              <tr>
                <td class="pc-email-body-inner" align="center" valign="top">
                  <!--[if gte mso 9]>
                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                      <v:fill type="tile" src="" color="#f4f4f4" />
                    </v:background>
                  <![endif]-->
                  <!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
                  <table
                    class="pc-email-container"
                    width="100%"
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="margin: 0 auto; max-width: 620px"
                  >
                    <tbody>
                      <tr>
                        <td align="left" valign="top" style="padding: 0 10px">
                          <table
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  height="20"
                                  style="font-size: 1px; line-height: 1px"
                                >
                                  &nbsp;
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!-- BEGIN MODULE: Header 1 -->
                          </div>
                      </v:textbox>
                  </v:rect>
                  <![endif]-->
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!-- END MODULE: Header 1 -->
                          <!-- BEGIN MODULE: Feature 1 -->
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  height="8"
                                  style="font-size: 1px; line-height: 1px"
                                >
                                  &nbsp;
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  valign="top"
                                  bgcolor="#ffffff"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          valign="top"
                                          style="
                                            padding: 0px 0px 0px;
                                            font-size: 1px;
                                          "
                                        >
                                          <img
                                            src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1661334158/cbroofing/Screen_Shot_2022-08-24_at_7.42.25_pm_hwswrh.png"
                                            alt="roof pic"
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td
                                          class="pc-fb-font"
                                          style="
                                            font-family: 'Fira Sans', Helvetica, Arial,
                                              sans-serif;
                                            font-size: 20px;
                                            font-weight: 300;
                                            line-height: 28px;
                                            color: #1b1b1b;
                                            letter-spacing: -0.2px;
                                          "
                                          valign="top"
                                          align="center"
                                        >
                                          ${job.address}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          height="15"
                                          style="font-size: 1px; line-height: 1px"
                                        >
                                          &nbsp;
                                        </td>
                                      </tr>
                                    </tbody>
                                    <!-- BEGIN MODULE: Feature 1 -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td class="pc-sm-p-35-10-15 pc-xs-p-25-0-5" style="padding: 40px 20px; background-color: #ffffff; border-radius: 8px;" valign="top" bgcolor="#ffffff">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                              <tbody>
                                                <tr>
                                                  <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; line-height: 34px; letter-spacing: -0.4px; color: #151515; padding: 0 20px; text-align: center;" valign="top">
                                                    Please see attached
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 34px; letter-spacing: -0.4px; color: #151515; padding: 0 20px; text-align: center;" valign="top">
                                                    <img style="max-width: 20px;" src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1649912595/cbroofing/email/Screen_Shot_2022-04-14_at_2.55.48_pm_rreouv.png" alt="ticks">
                                                    Your quote
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 34px; letter-spacing: -0.4px; color: #151515; padding: 0 20px; text-align: center;" valign="top">
                                                    <img style="max-width: 20px;" src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1649912595/cbroofing/email/Screen_Shot_2022-04-14_at_2.55.48_pm_rreouv.png" alt="ticks">
                                                    Chris Board Metal Roofing Guidelines
                                                  </td>
                                                </tr>
                                                <tr>
                                                <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                  <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 34px; letter-spacing: -0.4px; color: red; padding: 0 20px; text-align: center; text-decoration: underline" valign="top">
                                                    Please note currently lead time is 1 month. 
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!-- END MODULE: Feature 1 --> 
                                    <tbody>
                                      <tr>
                                        <td
                                          class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font"
                                          style="
                                            font-family: 'Fira Sans', Helvetica, Arial,
                                              sans-serif;
                                            font-size: 36px;
                                            font-weight: 900;
                                            line-height: 46px;
                                            letter-spacing: -0.6px;
                                            color: #151515;
                                            text-align: center;
                                          "
                                          valign="top"
                                        >
                                          How was your project quoted?
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          height="10"
                                          style="font-size: 1px; line-height: 1px"
                                        >
                                          &nbsp;
                                        </td>
                                      </tr>
                                    </tbody>
      
                                    <tbody>
                                      <tr>
                                        <td style="font-size: 0" valign="top">
                                          <!--[if (gte mso 9)|(IE)]><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="33%" valign="top"><![endif]-->
                                          <div
                                            class="pc-sm-mw-50pc pc-xs-mw-100pc"
                                            style="
                                              display: inline-block;
                                              width: 100%;
                                              max-width: 186px;
                                              vertical-align: top;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              role="presentation"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="padding: 20px"
                                                    valign="top"
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      width="100%"
                                                      role="presentation"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td valign="top">
                                                            <img
                                                              src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1649314772/cbroofing/email/Screen_Shot_2022-04-07_at_4.59.02_pm_arwbwe.png"
                                                              width="48"
                                                              height="48"
                                                              alt=""
                                                              style="
                                                                max-width: 100%;
                                                                height: auto;
                                                                border: 0;
                                                                line-height: 100%;
                                                                outline: 0;
                                                                -ms-interpolation-mode: bicubic;
                                                                display: block;
                                                                color: #1b1b1b;
                                                              "
                                                            />
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="10"
                                                            style="
                                                              font-size: 1px;
                                                              line-height: 1px;
                                                            "
                                                          >
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="pc-fb-font"
                                                            style="
                                                              font-family: 'Fira Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 18px;
                                                              font-weight: 500;
                                                              line-height: 24px;
                                                              letter-spacing: -0.2px;
                                                              color: #1b1b1b;
                                                            "
                                                            valign="top"
                                                          >
                                                            Satellite Imagery
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="6"
                                                            style="
                                                              font-size: 1px;
                                                              line-height: 1px;
                                                            "
                                                          >
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="pc-fb-font"
                                                            style="
                                                              font-family: 'Fira Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                              font-weight: 300;
                                                              line-height: 20px;
                                                              letter-spacing: -0.2px;
                                                              color: #9b9b9b;
                                                            "
                                                            valign="top"
                                                          >
                                                            Using the latest Satellite
                                                            Imagery to get an accurate
                                                            measure of your property.
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                          <!--[if (gte mso 9)|(IE)]></td><td width="33%" valign="top"><![endif]-->
                                          <div
                                            class="pc-sm-mw-50pc pc-xs-mw-100pc"
                                            style="
                                              display: inline-block;
                                              width: 100%;
                                              max-width: 186px;
                                              vertical-align: top;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              role="presentation"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="padding: 20px"
                                                    valign="top"
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      width="100%"
                                                      role="presentation"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td valign="top">
                                                            <img
                                                              src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1649314997/cbroofing/email/Screen_Shot_2022-04-07_at_5.03.14_pm_yfk2et.png"
                                                              width="48"
                                                              height="48"
                                                              alt=""
                                                              style="
                                                                max-width: 100%;
                                                                height: auto;
                                                                border: 0;
                                                                line-height: 100%;
                                                                outline: 0;
                                                                -ms-interpolation-mode: bicubic;
                                                                display: block;
                                                                color: #1b1b1b;
                                                              "
                                                            />
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="10"
                                                            style="
                                                              font-size: 1px;
                                                              line-height: 1px;
                                                            "
                                                          >
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="pc-fb-font"
                                                            style="
                                                              font-family: 'Fira Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 18px;
                                                              font-weight: 500;
                                                              line-height: 24px;
                                                              letter-spacing: -0.2px;
                                                              color: #1b1b1b;
                                                            "
                                                            valign="top"
                                                          >
                                                            Colorbond/Unicote
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="6"
                                                            style="
                                                              font-size: 1px;
                                                              line-height: 1px;
                                                            "
                                                          >
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="pc-fb-font"
                                                            style="
                                                              font-family: 'Fira Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                              font-weight: 300;
                                                              line-height: 20px;
                                                              letter-spacing: -0.2px;
                                                              color: #9b9b9b;
                                                            "
                                                            valign="top"
                                                          >
                                                            The highest quality
                                                            material has been quoted.
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                          <!--[if (gte mso 9)|(IE)]></td><td width="33%" valign="top"><![endif]-->
                                          <div
                                            class="pc-sm-mw-50pc pc-xs-mw-100pc"
                                            style="
                                              display: inline-block;
                                              width: 100%;
                                              max-width: 186px;
                                              vertical-align: top;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              role="presentation"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="padding: 20px"
                                                    valign="top"
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      width="100%"
                                                      role="presentation"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td valign="top">
                                                            <img
                                                              src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1649315211/cbroofing/email/Screen_Shot_2022-04-07_at_5.06.48_pm_pipq4c.png"
                                                              width="48"
                                                              height="48"
                                                              alt=""
                                                              style="
                                                                max-width: 100%;
                                                                height: auto;
                                                                border: 0;
                                                                line-height: 100%;
                                                                outline: 0;
                                                                -ms-interpolation-mode: bicubic;
                                                                display: block;
                                                                color: #1b1b1b;
                                                              "
                                                            />
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="10"
                                                            style="
                                                              font-size: 1px;
                                                              line-height: 1px;
                                                            "
                                                          >
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="pc-fb-font"
                                                            style="
                                                              font-family: 'Fira Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 18px;
                                                              font-weight: 500;
                                                              line-height: 24px;
                                                              letter-spacing: -0.2px;
                                                              color: #1b1b1b;
                                                            "
                                                            valign="top"
                                                          >
                                                            Warranty
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="6"
                                                            style="
                                                              font-size: 1px;
                                                              line-height: 1px;
                                                            "
                                                          >
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="pc-fb-font"
                                                            style="
                                                              font-family: 'Fira Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                              font-weight: 300;
                                                              line-height: 20px;
                                                              letter-spacing: -0.2px;
                                                              color: #9b9b9b;
                                                            "
                                                            valign="top"
                                                          >
                                                            Rest assured knowing that
                                                            your quote comes with a 10
                                                            year worksmanship warranty
                                                            and a 25 year material
                                                            warranty.
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                          <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!-- END MODULE: Feature 1 -->
      
                          <!-- BEGIN MODULE: Call to Action 2 -->
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  height="8"
                                  style="font-size: 1px;"
                                >
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="pc-sm-p-35-30 pc-xs-p-25-20"
                                  style="
                                    padding: 40px;
                                    background-color: #ffffff;
                                    border-radius: 8px;
                                  "
                                  valign="top"
                                  bgcolor="#ffffff"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font"
                                          style="
                                            font-family: 'Fira Sans', Helvetica, Arial,
                                              sans-serif;
                                            font-size: 36px;
                                            font-weight: 900;
                                            line-height: 46px;
                                            letter-spacing: -0.6px;
                                            color: #151515;
                                            text-align: center;
                                          "
                                          valign="top"
                                        >
                                          Check out our Website!
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          height="10"
                                          style="font-size: 1px; line-height: 1px"
                                        >
                                          &nbsp;
                                        </td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td
                                          class="pc-fb-font"
                                          style="
                                            font-family: 'Fira Sans', Helvetica, Arial,
                                              sans-serif;
                                            font-size: 20px;
                                            font-weight: 300;
                                            line-height: 28px;
                                            color: #1b1b1b;
                                            letter-spacing: -0.2px;
                                          "
                                          valign="top"
                                          align="center"
                                        >
                                          For more information about us
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          height="15"
                                          style="font-size: 1px; line-height: 1px"
                                        >
                                          &nbsp;
                                        </td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td
                                          style="padding: 5px 0"
                                          valign="top"
                                          align="center"
                                        >
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 13px 17px;
                                                    border-radius: 8px;
                                                    background-color: #1595e7;
                                                  "
                                                  bgcolor="#1595E7"
                                                  valign="top"
                                                  align="center"
                                                >
                                                  <a
                                                    href="https://www.cbroofing.com.au/"
                                                    style="
                                                      line-height: 1.5;
                                                      text-decoration: none;
                                                      word-break: break-word;
                                                      font-weight: 500;
                                                      display: block;
                                                      font-family: 'Fira Sans',
                                                        Helvetica, Arial, sans-serif;
                                                      font-size: 16px;
                                                      color: #ffffff;
                                                    "
                                                    >cbroofing.com.au</a
                                                  >
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!-- END MODULE: Call to Action 2 -->
                          <!-- BEGIN MODULE: Footer 1 -->
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  height="8"
                                  style="font-size: 1px; line-height: 1px"
                                >
                                  &nbsp;
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="pc-sm-p-21-10-14 pc-xs-p-5-0"
                                  style="
                                    padding: 21px 20px 14px 20px;
                                    background-color: #1b1b1b;
                                    border-radius: 8px;
                                  "
                                  valign="top"
                                  bgcolor="#1B1B1B"
                                  role="presentation"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    role="presentation"
                                  >
                                    <tbody>
                                      <tr>
                                        <td style="font-size: 0" valign="top">
                                          <!--[if (gte mso 9)|(IE)]><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="280" valign="top"><![endif]-->
                                          <div
                                            class="pc-sm-mw-100pc"
                                            style="
                                              display: inline-block;
                                              width: 100%;
                                              max-width: 280px;
                                              vertical-align: top;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              role="presentation"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="padding: 20px"
                                                    valign="top"
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      width="100%"
                                                      role="presentation"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="pc-fb-font"
                                                            style="
                                                              font-family: 'Fira Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 18px;
                                                              font-weight: 500;
                                                              line-height: 24px;
                                                              letter-spacing: -0.2px;
                                                              color: #ffffff;
                                                            "
                                                            valign="top"
                                                          >
                                                            Follow Us.
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="11"
                                                            style="
                                                              line-height: 1px;
                                                              font-size: 1px;
                                                            "
                                                          >
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="pc-fb-font"
                                                            style="
                                                              font-family: 'Fira Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                              line-height: 20px;
                                                              letter-spacing: -0.2px;
                                                              color: #d8d8d8;
                                                            "
                                                            valign="top"
                                                          >
                                                            We are always looking for
                                                            new exciting projects and
                                                            collaborations. Feel free
                                                            to contact us.
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            class="pc-sm-h-20"
                                                            height="56"
                                                            style="
                                                              line-height: 1px;
                                                              font-size: 1px;
                                                            "
                                                          >
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            style="
                                                              font-family: Arial,
                                                                sans-serif;
                                                              font-size: 19px;
                                                            "
                                                            valign="top"
                                                          >
                                                            <a
                                                              href="https://www.facebook.com/Chris-Board-Metal-Roofing-107385121063238"
                                                              style="
                                                                text-decoration: none;
                                                              "
                                                              ><img
                                                                src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1649376199/cbroofing/email/facebook-dark-gray_d9nqlf.png"
                                                                width="20"
                                                                height="20"
                                                                alt=""
                                                                style="
                                                                  border: 0;
                                                                  line-height: 100%;
                                                                  outline: 0;
                                                                  -ms-interpolation-mode: bicubic;
                                                                  color: #ffffff;
                                                                "
                                                            /></a>
                                                            <span>&nbsp;&nbsp;</span>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                          <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
                                          <div
                                            class="pc-sm-mw-100pc"
                                            style="
                                              display: inline-block;
                                              width: 100%;
                                              max-width: 280px;
                                              vertical-align: top;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              role="presentation"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="padding: 20px"
                                                    valign="top"
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      width="100%"
                                                      role="presentation"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="pc-fb-font"
                                                            style="
                                                              font-family: 'Fira Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 18px;
                                                              font-weight: 500;
                                                              line-height: 24px;
                                                              letter-spacing: -0.2px;
                                                              color: #ffffff;
                                                            "
                                                            valign="top"
                                                          >
                                                            Contact us.
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="11"
                                                            style="
                                                              line-height: 1px;
                                                              font-size: 1px;
                                                            "
                                                          >
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="pc-fb-font"
                                                            style="
                                                              font-family: 'Fira Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                              line-height: 20px;
                                                              letter-spacing: -0.2px;
                                                              color: #d8d8d8;
                                                            "
                                                            valign="top"
                                                          >
                                                            Gold Coast, Queensland
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            class="pc-sm-h-20"
                                                            height="45"
                                                            style="
                                                              line-height: 1px;
                                                              font-size: 1px;
                                                            "
                                                          >
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="pc-fb-font"
                                                            style="
                                                              font-family: 'Fira Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 18px;
                                                              font-weight: 500;
                                                              line-height: 24px;
                                                              letter-spacing: -0.2px;
                                                            "
                                                            valign="top"
                                                          >
                                                            <a
                                                              href="tel:749-977-3440"
                                                              style="
                                                                text-decoration: none;
                                                                color: #ffffff;
                                                              "
                                                              >0426412230</a
                                                            >
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="9"
                                                            style="
                                                              line-height: 1px;
                                                              font-size: 1px;
                                                            "
                                                          >
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            class="pc-fb-font"
                                                            style="
                                                              font-family: 'Fira Sans',
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                              font-size: 14px;
                                                              font-weight: 500;
                                                              line-height: 24px;
                                                            "
                                                            valign="top"
                                                          >
                                                            <a
                                                              href="mailto:bo.grady@nathen.biz"
                                                              style="
                                                                text-decoration: none;
                                                                color: #1595e7;
                                                              "
                                                              >cbroofing@hotmail.com</a
                                                            >
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                          <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!-- END MODULE: Footer 1 -->
                          <table
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                <td
                                  height="20"
                                  style="font-size: 1px; line-height: 1px"
                                >
                                  &nbsp;
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Fix for Gmail on iOS -->
          <div
            class="pc-gmail-fix"
            style="white-space: nowrap; font: 15px courier; line-height: 0"
          >
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </div>
        </body>
      </html>
      `;
}

export { emailMessage };
