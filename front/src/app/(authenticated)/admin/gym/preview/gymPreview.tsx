'use client'

import DashboardBodyContainer from '@/components/authenticated/dashboardBodyContainer'
import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import useGetGymInfo from '@/hooks/gym/useGetGymInfo'
import { displayStrapiImage } from '@/lib/utils/utils'

import Image from 'next/image'
import Planning from '../planning/planning'

export default function GymPreview() {
  const { data, isLoading, isError } = useGetGymInfo()

  const gym = data?.data.attributes
  const gymId = data?.data.id
  const address = gym?.address
  const map = gym?.map
  const socialMedia = gym?.social_media
  const prices = gym?.prices
  const openTime = gym?.open_time

  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />

  return (
    <>
      <h1 className="text-2xl font-bold uppercase mb-8">Preview</h1>

      <DashboardBodyContainer>
        <div className="mb-4">
          {gym?.logo && gymId && (
            <Image
              width={200}
              height={200}
              src={displayStrapiImage({
                media: gym?.logo,
              })}
              alt=""
            />
          )}
        </div>

        <div className="flex gap-8 mb-8">
          <div className="flex flex-col gap-4 mt-8">
            <h2 className="text-lg font-bold">General</h2>

            <p>Nom: {gym?.name}</p>
            <p>Phone: {gym?.phone}</p>
            <p>Email: {gym?.email}</p>
            <p>Description: {gym?.description}</p>
            <p>Site web: {gym?.website}</p>
            <hr />

            {address && (
              <>
                <h2 className="text-lg font-bold">Adresse</h2>
                <p>Ville: {address?.city}</p>
                <p>Code postal: {address?.zip_code}</p>
                <p>Rue: {address?.street}</p>
                <p>Google map: {map?.link}</p>
              </>
            )}

            {openTime && (
              <>
                <h2 className="text-lg font-bold">Horaire d'ouverture</h2>
                {openTime?.monday?.open && openTime?.monday?.close && (
                  <p>
                    Lundi: {openTime.monday.open.toString().substring(0, 5)}
                    {' - '}
                    {openTime.monday.close.toString().substring(0, 5)}
                  </p>
                )}
                {openTime?.tuesday?.open && openTime?.tuesday?.close && (
                  <p>
                    Mardi: {openTime.tuesday.open.toString().substring(0, 5)}
                    {' - '}
                    {openTime.tuesday.close.toString().substring(0, 5)}
                  </p>
                )}
                {openTime?.wednesday?.open && openTime?.wednesday?.close && (
                  <p>
                    Mercredi:{' '}
                    {openTime.wednesday.open.toString().substring(0, 5)}
                    {' - '}
                    {openTime.wednesday.close.toString().substring(0, 5)}
                  </p>
                )}
                {openTime?.thursday?.open && openTime?.thursday?.close && (
                  <p>
                    Jeudi: {openTime.thursday.open.toString().substring(0, 5)}
                    {' - '}
                    {openTime.thursday.close.toString().substring(0, 5)}
                  </p>
                )}
                {openTime?.friday?.open && openTime?.friday?.close && (
                  <p>
                    Vendredi: {openTime.friday.open.toString().substring(0, 5)}
                    {' - '}
                    {openTime.friday.close.toString().substring(0, 5)}
                  </p>
                )}
                {openTime?.saturday?.open && openTime?.saturday?.close && (
                  <p>
                    Samedi: {openTime.saturday.open.toString().substring(0, 5)}
                    {' - '}
                    {openTime.saturday.close.toString().substring(0, 5)}
                  </p>
                )}
                {openTime?.sunday?.open && openTime?.sunday?.close && (
                  <p>
                    Dimanche: {openTime.sunday.open.toString().substring(0, 5)}
                    {' - '}
                    {openTime.sunday.close.toString().substring(0, 5)}
                  </p>
                )}
              </>
            )}

            {socialMedia && (
              <>
                <h2 className="text-lg font-bold">Réseau sociaux</h2>
                <p>LinkedIn: {socialMedia?.linkedin}</p>
                <p>Facebook: {socialMedia?.facebook}</p>
                <p>Instagram: {socialMedia?.instagram}</p>
                <p>Youtube: {socialMedia?.youtube}</p>
                <p>Twitter: {socialMedia?.twitter}</p>
              </>
            )}

            {prices && (
              <>
                <hr />
                <h2 className="text-lg font-bold">Tarifs</h2>
                <p>
                  Frais d'inscription:{' '}
                  {prices?.subscription_fees + ' ' + prices.currency}
                  {prices.extra_info && (
                    <p className="mt-2 text-sm">{prices.extra_info}</p>
                  )}
                </p>
                {prices.packs?.map((pack, key) => {
                  return (
                    <div key={key}>
                      <p className="font-bold">{pack.name}</p>
                      {pack.one_month && (
                        <p>1 mois: {pack.one_month + ' ' + prices.currency}</p>
                      )}
                      {pack.three_months && (
                        <p>
                          3 mois: {pack.three_months + ' ' + prices.currency}
                        </p>
                      )}
                      {pack.six_months && (
                        <p>6 mois: {pack.six_months + ' ' + prices.currency}</p>
                      )}
                      {pack.nine_months && (
                        <p>
                          9 mois: {pack.nine_months + ' ' + prices.currency}
                        </p>
                      )}
                      {pack.one_year && (
                        <p>1 année: {pack.one_year + ' ' + prices.currency}</p>
                      )}
                      {pack.extra_info && (
                        <p className="mt-2 text-sm">{pack.extra_info}</p>
                      )}
                      <hr className="my-2" />
                    </div>
                  )
                })}
              </>
            )}

            <h2 className="text-lg font-bold">Planning</h2>
            <Planning />
          </div>
        </div>
      </DashboardBodyContainer>
    </>
  )
}
