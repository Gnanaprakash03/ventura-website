import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Resources')
        .child(
          S.list()
            .title('Resources')
            .items([
              S.documentTypeListItem('resourcesPage').title('Resources Page'),
              S.listItem()
                .title('Blog')
                .child(
                  S.list()
                    .title('Blog')
                    .items([
                      S.documentTypeListItem('post').title('Posts'),
                      S.documentTypeListItem('category').title('Categories'),
                      S.documentTypeListItem('author').title('Authors'),
                    ])
                ),
              S.documentTypeListItem('faq').title('FAQ'),
              S.documentTypeListItem('downloadsPage').title('Downloads'),
            ])
        ),
      S.listItem()
        .title('Customers')
        .child(
          S.list()
            .title('Customers')
            .items([
              S.documentTypeListItem('customersPage').title('Customers Page'),
              S.documentTypeListItem('customerSuccess').title('Customer Success Stories'),
              S.documentTypeListItem('customerList').title('Customer List'),
            ])
        ),
      S.listItem()
        .title('Products')
        .child(
          S.list()
            .title('Products')
            .items([
              S.documentTypeListItem('softwareProduct').title('Software Products'),
              S.documentTypeListItem('technology').title('Technologies'),
              S.documentTypeListItem('sapIntegrationPage').title('SAP Integration'),
              S.documentTypeListItem('productsPage').title('Products Main Page'),
              S.listItem()
                .title('Hardware Products')
                .child(
                  S.list()
                    .title('Hardware Products')
                    .items([
                      S.documentTypeListItem('hardwareProductsPage').title('Hardware Products Page'),
                      S.listItem()
                        .title('Products Page')
                        .child(
                          S.list()
                            .title('Products Page')
                            .items([
                              S.documentTypeListItem('fabricLengthCounterPage').title('Fabric Length Counter Page'),
                              S.documentTypeListItem('barcodeScanningPrintingPage').title('Barcode Scanning & Printing Page'),
                              S.documentTypeListItem('defectStickeringSystemPage').title('Defect Stickering System Page'),
                              S.documentTypeListItem('digitalPickCounterPage').title('Digital Pick Counter Page'),
                              S.documentTypeListItem('gsmCapturingPage').title('GSM Capturing Page'),
                              S.documentTypeListItem('heatFuseLabellingMachinePage').title('Heat Fuse Labelling Machine Page'),
                              S.documentTypeListItem('touchscreenMonitorPage').title('Touchscreen Monitor Page'),
                              S.documentTypeListItem('widthMeasurementSystemPage').title('Width Measurement System Page'),
                            ])
                        )
                    ])
                ),
            ])
        ),
      S.listItem()
        .title('Services')
        .child(
          S.list()
            .title('Services')
            .items([
              S.documentTypeListItem('servicesPage').title('Services Page'),
              S.documentTypeListItem('benefit').title('Benefits'),
              S.documentTypeListItem('howItWorksPage').title('How It Works'),
              S.documentTypeListItem('implementationPage').title('Implementation'),
            ])
        ),
      S.listItem()
        .title('About')
        .child(
          S.list()
            .title('About')
            .items([
              S.listItem()
                .title('Company Information')
                .child(
                  S.list()
                    .title('Company Information')
                    .items([
                      S.documentTypeListItem('companyInfo').title('Company Information'),
                      S.documentTypeListItem('historyEvent').title('History Events'),
                    ])
                ),
              S.documentTypeListItem('fidasPage').title('What is FIDAS'),
              S.documentTypeListItem('companyPage').title('About Us'),
              S.documentTypeListItem('aboutPage').title('About Page'),
            ])
        ),
      S.listItem()
        .title('Contact')
        .child(
          S.list()
            .title('Contact')
            .items([
              S.documentTypeListItem('contactUsPage').title('Contact Us Page'),
              S.documentTypeListItem('socialMediaPage').title('Social Media Page'),
              S.documentTypeListItem('contactPage').title('Contact Page'),
            ])
      
        ),

        S.listItem()
          .title("Home Page")
          .child(
            S.list()
              .title('Section')
              .items([
                S.documentTypeListItem("aboutsection").title("About Section"),
                S.documentTypeListItem("factsSection").title("Facts Section"),
                S.documentTypeListItem("statisticsSection").title("Statistics Section"),
                S.documentTypeListItem("howFIDASWorks").title("How FIDAS Works Page"),
              ])
          ),
        S.listItem()
          .title("Solution Page")
          .child(
            S.list()
              .title('Section')
              .items([
                S.documentTypeListItem("solutionRootPage").title("Solution Home Page"),
                S.documentTypeListItem("industryVerticalPage").title("Industry Vertical Page"),
                S.documentTypeListItem("otherSolutionPageType").title("Other Solutions Page"),

              ])
          ),
      
      
      S.documentTypeListItem('heroSlideshow').title('Hero Slideshow'),
      S.documentTypeListItem('fidasContentPage').title('FIDAS Content Page'),
      S.documentTypeListItem('footer').title('Footer'),

    ])
