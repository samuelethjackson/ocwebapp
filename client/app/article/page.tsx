import Image from 'next/image';
import React from 'react';
import VideoElement from '../components/VideoElement';

export default function Article() {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row center">
      <div className="flex w-full h-full bg-black">
        <article className='flex flex-col ml-32'>
          <p className="text-white">Through hyper-detailed soundscape compositions, combined with 360 videography, kinetic seating, and olfactory effects, »Oceanic Refractions« creates an unforgettable sensorial experience. Moved by listening and silence, the work offers audiences rare insights into the environmental relations sustaining Oceania’s many worlds. The climate crisis, an expression of colonial-capitalist violence, is intensifying rapidly. Oceanic frontline communities have long been navigating changing ecosystems. It is through cultures of reciprocity between people, lands and waters, that these changes are being experienced. By listening to environments we recognise our interdependence with the earth; we need one another to survive. Across Oceania, interdependence enables self-determination, collaboration and care in the face of incommensurable loss and grief. Professor Nabobo-Baba’s comment is one of many Oceanian perspectives, grounded in such interdependence. In »Oceanic Refractions,« field recordings of the reefs of Fiji, the oceans and mangroves of Kiribati, and the shorelines of Papua New Guinea’s Duke of York Islands are interwoven with reflections from teachers, artists, fisherpeople, grandparents, and chiefs. Moved by listening and silence, »Oceanic Refractions« offers audiences rare insights into the environmental relations sustaining Oceania’s many worlds.</p>
        </article>
      </div>
      <div className="flex w-full h-full bg-blue-500">
        <VideoElement />
      </div>
    </div>
  );
}