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

export interface GymPricesGymPrices extends Schema.Component {
  collectionName: 'components_gym_price_gym_prices';
  info: {
    displayName: 'gym-prices';
    description: '';
  };
  attributes: {
    currency: Attribute.Enumeration<['TND', 'EUR', 'USD']> &
      Attribute.DefaultTo<'TND'>;
    subscription_fees: Attribute.Decimal;
    packs: Attribute.Component<'gym-prices.pack-prices', true>;
  };
}

export interface GymPricesPackPrices extends Schema.Component {
  collectionName: 'components_gym_prices_pack_prices';
  info: {
    displayName: 'pack-prices';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.DefaultTo<'Standard'>;
    description: Attribute.Text;
    one_month: Attribute.Decimal;
    three_months: Attribute.Decimal;
    six_months: Attribute.Decimal;
    nine_months: Attribute.Decimal;
    one_year: Attribute.Decimal;
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
      'gym-prices.gym-prices': GymPricesGymPrices;
      'gym-prices.pack-prices': GymPricesPackPrices;
      'social-media-links.social-media-links': SocialMediaLinksSocialMediaLinks;
    }
  }
}
