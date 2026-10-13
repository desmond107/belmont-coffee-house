/**
 * LICENCES & CERTIFICATIONS
 *
 * `licences` are documents Belmont holds. Add licence numbers where marked.
 * `programmes` are third-party certification schemes. Only list a programme as
 * available if you (or a partner cooperative) genuinely hold it for the lots
 * you sell — set `available: false` to hide one from the site and filters.
 */

export type Licence = {
  id: string;
  name: string;
  short: string;
  issuer: string;
  reference: string;
  description: string;
};

export const licences: Licence[] = [
  {
    id: "export-licence",
    name: "Coffee Export Licence",
    short: "Export Licence",
    issuer: "Agriculture and Food Authority (AFA) — Coffee Directorate, Kenya",
    reference: "[Licence No.]",
    description:
      "Authorises Belmont to purchase, contract and export green coffee from Kenya. Renewed annually and verifiable with the Coffee Directorate on request.",
  },
  {
    id: "movement-permit",
    name: "Coffee Movement Permit",
    short: "Movement Permit",
    issuer: "AFA — Coffee Directorate, Kenya",
    reference: "[Permit No.]",
    description:
      "Issued for each consignment moved between mill, warehouse and port, so every bag in your container can be traced back through the regulated chain of custody.",
  },
  {
    id: "liquorer-licence",
    name: "Coffee Liquorer Licence",
    short: "Liquorer Licence",
    issuer: "AFA — Coffee Directorate, Kenya",
    reference: "[Licence No.]",
    description:
      "Licenses our cupping laboratory and liquorers to evaluate and grade coffee. Every lot we offer has been cupped and scored in-house before it reaches you.",
  },
  {
    id: "eu-import",
    name: "EU Import Compliance",
    short: "EU Compliance",
    issuer: "[Confirm exact document name and issuing body]",
    reference: "[Reference No.]",
    description:
      "Documentation supporting entry into the European Union, including farm-plot geolocation and due-diligence data prepared for the EU Deforestation Regulation (EUDR). [Confirm scope before launch.]",
  },
  {
    id: "certificate-of-origin",
    name: "Certificate of Origin",
    short: "Cert. of Origin",
    issuer: "Issued per shipment — [KNCCI / KRA, confirm]",
    reference: "Per shipment",
    description:
      "Issued for every shipment to confirm country of origin and, where applicable, qualify your import for preferential duty under trade agreements such as EU–EAC.",
  },
];

export type Programme = {
  id: string;
  name: string;
  available: boolean;
  description: string;
};

export const programmes: Programme[] = [
  {
    id: "organic",
    name: "Organic",
    available: true,
    description:
      "Lots grown without synthetic fertilisers or pesticides and certified to EU and USDA organic standards by an accredited body. [Confirm certified lots and certifier.]",
  },
  {
    id: "fairtrade",
    name: "Fairtrade",
    available: true,
    description:
      "Sourced from Fairtrade-certified cooperatives, guaranteeing a minimum price and a Fairtrade Premium that farmers invest in their communities. [Confirm.]",
  },
  {
    id: "rainforest-alliance",
    name: "Rainforest Alliance",
    available: true,
    description:
      "Farms audited for biodiversity protection, soil and water management, and workers' rights under the Rainforest Alliance Sustainable Agriculture Standard. [Confirm.]",
  },
  {
    id: "iso-22000",
    name: "ISO 22000",
    available: true,
    description:
      "Food-safety management across milling, storage and roasting, aligned with the ISO 22000 framework. [Confirm certification status or remove.]",
  },
  {
    id: "haccp",
    name: "HACCP",
    available: true,
    description:
      "Hazard Analysis and Critical Control Points plan covering our roasting and packing operations, so retail and private-label coffee meets importer food-safety requirements. [Confirm.]",
  },
  {
    id: "sca",
    name: "SCA Member",
    available: true,
    description:
      "Member of the Specialty Coffee Association. Our cupping follows SCA protocols and our team includes licensed Q Arabica Graders. [Confirm membership and Q-grader licences.]",
  },
];

export const programmeName = (id: string) => programmes.find((p) => p.id === id)?.name ?? id;
