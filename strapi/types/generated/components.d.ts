import type { Schema, Attribute } from '@strapi/strapi';

export interface AddressAddress extends Schema.Component {
  collectionName: 'components_address_addresses';
  info: {
    displayName: 'address';
  };
  attributes: {
    city: Attribute.String;
    zip_code: Attribute.String;
    street: Attribute.String;
  };
}

export interface AddressMap extends Schema.Component {
  collectionName: 'components_address_maps';
  info: {
    displayName: 'map';
    description: '';
  };
  attributes: {
    link: Attribute.String;
  };
}

export interface SocialMediaLinksSocialMediaLinks extends Schema.Component {
  collectionName: 'components_social_media_links_social_media_links';
  info: {
    displayName: 'Social media links';
    description: '';
  };
  attributes: {
    facebook: Attribute.String;
    instagram: Attribute.String;
    twitter: Attribute.String;
    youtube: Attribute.String;
    linkedin: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'address.address': AddressAddress;
      'address.map': AddressMap;
      'social-media-links.social-media-links': SocialMediaLinksSocialMediaLinks;
    }
  }
}
