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
    subscription_fees: Attribute.String;
    one_month: Attribute.Component<'gym-prices.price-details'>;
    three_months: Attribute.Component<'gym-prices.price-details'>;
    six_months: Attribute.Component<'gym-prices.price-details'>;
    one_year: Attribute.Component<'gym-prices.price-details'>;
    currency: Attribute.Enumeration<['TND', 'EUR', 'USD']>;
  };
}

export interface GymPricesPriceDetails extends Schema.Component {
  collectionName: 'components_gym_prices_price_details';
  info: {
    displayName: 'price-details';
  };
  attributes: {
    price: Attribute.String;
    extra_info: Attribute.String;
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
      'gym-prices.price-details': GymPricesPriceDetails;
      'social-media-links.social-media-links': SocialMediaLinksSocialMediaLinks;
    }
  }
}
