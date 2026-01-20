import type { Schema, Struct } from '@strapi/strapi';

export interface AncillaryAboutCard extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_about_cards';
  info: {
    displayName: 'About Card';
    icon: 'alien';
  };
  attributes: {
    Email: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Name: Schema.Attribute.String;
    Phone: Schema.Attribute.String;
    Position: Schema.Attribute.String;
    Socials: Schema.Attribute.Component<'ancillary.button', true>;
  };
}

export interface AncillaryBoxSection extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_box_sections';
  info: {
    displayName: 'Box Section';
    icon: 'archive';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Heading: Schema.Attribute.Text;
    List: Schema.Attribute.Component<'ancillary.list', true>;
    Subheading: Schema.Attribute.String;
  };
}

export interface AncillaryBullets extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_bullets';
  info: {
    displayName: 'Bullets';
    icon: 'arrowRight';
  };
  attributes: {
    Text: Schema.Attribute.Text;
  };
}

export interface AncillaryButton extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_buttons';
  info: {
    displayName: 'Button';
    icon: 'bold';
  };
  attributes: {
    Button_text: Schema.Attribute.String;
    Button_url: Schema.Attribute.Text;
  };
}

export interface AncillaryDownloads extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_downloads';
  info: {
    displayName: 'Downloads';
    icon: 'alien';
  };
  attributes: {
    ButtonText: Schema.Attribute.String;
    ButtonUrl: Schema.Attribute.Text;
    Description: Schema.Attribute.Text;
    Identifier: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface AncillaryFaq extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_faqs';
  info: {
    displayName: 'FAQ';
    icon: 'arrowRight';
  };
  attributes: {
    QnA: Schema.Attribute.Component<'ancillary.key-value', true>;
    Section: Schema.Attribute.String;
  };
}

export interface AncillaryKeyValue extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_key_values';
  info: {
    displayName: 'Key Value';
    icon: 'apps';
  };
  attributes: {
    Details: Schema.Attribute.Text;
    Identifier: Schema.Attribute.String;
    Text: Schema.Attribute.Text;
  };
}

export interface AncillaryList extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_lists';
  info: {
    displayName: 'List';
    icon: 'book';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Number: Schema.Attribute.String;
    Subheading: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
    Video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface AncillaryMultipleSubheadings extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_multiple_subheadings';
  info: {
    displayName: 'Multiple Subheadings';
    icon: 'briefcase';
  };
  attributes: {
    Button: Schema.Attribute.Component<'ancillary.button', false>;
    Description1: Schema.Attribute.Text;
    Description2: Schema.Attribute.Text;
    Description3: Schema.Attribute.Text;
    Description4: Schema.Attribute.Text;
    Suheading1: Schema.Attribute.String;
    Suheading2: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface AncillaryProductPageMain extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_product_page_mains';
  info: {
    displayName: 'Product Page - Main';
    icon: 'archive';
  };
  attributes: {
    Button: Schema.Attribute.Component<'ancillary.button', false>;
    Heading: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    List: Schema.Attribute.Component<'ancillary.bullets', true>;
    Subheading: Schema.Attribute.Text;
  };
}

export interface AncillaryRows extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_rows';
  info: {
    displayName: 'Rows';
    icon: 'bulletList';
  };
  attributes: {
    Data: Schema.Attribute.Component<'ancillary.key-value', true>;
  };
}

export interface AncillarySections extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_sections';
  info: {
    displayName: 'Sections';
    icon: 'attachment';
  };
  attributes: {
    Asset: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Button: Schema.Attribute.Component<'ancillary.button', false>;
    Description: Schema.Attribute.Text;
    Heading: Schema.Attribute.String;
    mobile: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Name: Schema.Attribute.String;
    Subheading: Schema.Attribute.Text;
  };
}

export interface AncillarySeoDetails extends Struct.ComponentSchema {
  collectionName: 'components_ancillary_seo_details';
  info: {
    displayName: 'SEO Details';
    icon: 'dashboard';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    MetaImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Sections: Schema.Attribute.Component<'ancillary.sections', true>;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'ancillary.about-card': AncillaryAboutCard;
      'ancillary.box-section': AncillaryBoxSection;
      'ancillary.bullets': AncillaryBullets;
      'ancillary.button': AncillaryButton;
      'ancillary.downloads': AncillaryDownloads;
      'ancillary.faq': AncillaryFaq;
      'ancillary.key-value': AncillaryKeyValue;
      'ancillary.list': AncillaryList;
      'ancillary.multiple-subheadings': AncillaryMultipleSubheadings;
      'ancillary.product-page-main': AncillaryProductPageMain;
      'ancillary.rows': AncillaryRows;
      'ancillary.sections': AncillarySections;
      'ancillary.seo-details': AncillarySeoDetails;
    }
  }
}
