import type { Schema, Struct } from '@strapi/strapi';

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
      'ancillary.button': AncillaryButton;
      'ancillary.list': AncillaryList;
      'ancillary.multiple-subheadings': AncillaryMultipleSubheadings;
      'ancillary.sections': AncillarySections;
      'ancillary.seo-details': AncillarySeoDetails;
    }
  }
}
