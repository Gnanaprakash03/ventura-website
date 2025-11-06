import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { customerSuccessType } from './customerSuccessType'
import { customerListType } from './customerListType'
import { faqType } from './faqType'
import { softwareProductType } from './softwareProductType'
import { technologyType } from './technologyType'
import { benefitType } from './benefitType'
import { companyInfoType, historyEventType } from './companyInfoType'
import { fidasPageType } from './fidasPageType'
import { companyPageType } from './companyPageType'
import { sapIntegrationPageType } from './sapIntegrationPageType'
import { howItWorksPageType } from './howItWorksPageType'
import { implementationPageType } from './implementationPageType'
import { downloadsPageType } from './downloadsPageType'
import { contactUsPageType } from './contactUsPageType'
import { socialMediaPageType } from './socialMediaPageType'
import { hardwareProductsPageType } from './hardwareProductsPageType'
import { fabricLengthCounterPageType } from './fabricLengthCounterPageType'
import { barcodeScanningPrintingPageType } from './barcodeScanningPrintingType'
import defectStickeringSystemPage from './defectStickeringSystemType'
import digitalPickCounterPage from './digitalPickCounterType'
import gsmCapturingPage from './gsmCapturingType'
import heatFuseLabellingMachinePage from './heatFuseLabellingMachineType'
import touchscreenMonitorPage from './touchscreenMonitorType'
import widthMeasurementSystemPage from './widthMeasurementSystemType'
import heroSlideshowType from './heroSlideshowType'
import fidasContentPage from './fidasContentType'
import footerType from './footerType'
import { resourcesPageType } from './resourcesPageType'
import { servicesPageType } from './servicesPage'
import { productsPageType } from './productsPage'
import { customersPageType } from './customersPage'
import { aboutPageType } from './aboutPage'
import { contactPageType } from './contactPage'
import { about } from './aboutsectionType'
import { benefit } from './aboutbenefitType'
import { factsSectionType } from './factsSectionType'
import { factItemType } from './factItemType'
import { statisticsSection } from './statisticsSectionType'
import { solutionRootPage } from './solutionRootPageType'
import { solutionItem } from './solutionItemType'
import { industryVerticalPage } from './industryverticalPageType'
import { otherSolutionPageType } from './otherSolutionPageType'
import howFIDASWorks from './howFIDASWorks'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    customerSuccessType,
    customerListType,
    faqType,
    softwareProductType,
    technologyType,
    benefitType,
    companyInfoType,
    historyEventType,
    fidasPageType,
    companyPageType,
    sapIntegrationPageType,
    howItWorksPageType,
    implementationPageType,
    downloadsPageType,
    contactUsPageType,
    socialMediaPageType,
    hardwareProductsPageType,
    fabricLengthCounterPageType,
    barcodeScanningPrintingPageType,
    defectStickeringSystemPage,
    digitalPickCounterPage,
    gsmCapturingPage,
    heatFuseLabellingMachinePage,
    touchscreenMonitorPage,
    widthMeasurementSystemPage,
    heroSlideshowType,
    fidasContentPage,
    footerType,
    resourcesPageType,
    servicesPageType,
    productsPageType,
    customersPageType,
    aboutPageType,
    contactPageType,
    about,
    benefit,
    factsSectionType,
    factItemType,
    statisticsSection,
    solutionRootPage,
    solutionItem,
    industryVerticalPage,
    otherSolutionPageType,
    howFIDASWorks
  ],
}
