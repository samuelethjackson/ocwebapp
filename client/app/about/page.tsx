import React from 'react';
import TitleBand from '../components/TitleBand';

const AboutPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <TitleBand pageName="About" />
            <main className="w-screen h-screen grid grid-cols-24 px-5">
                <div className='col-start-4 col-end-13 about pt-40'>
                    <p>
                        We are working with a variety of cultural materials that hold great significance, and need to be treated respectfully. We view the materials we are working with as being a part of the places they are taken from containing spiritual and emotional attributes and connections. We do not use these materials lightly. Acknowledging the immeasurable value of the recordings and the contributions of the Pacific people featured in the work, this endeavour incorporates the informed consent of its participants and the guidance and advice of Pacific practitioners of art, culture and development for a generative experience.
                    </p>
                    <p>
                        As collaborators in a team with various chronic illnesses, pain and disabilities, we honour our interdependence and co-existence within systems of care. We prioritise rest and pacing; everyone has different capacities and needs. We treat each other with grace and dignity. In our work relations we seek to transform rather than avoid mistakes and conflict. We honour non-conventional ways of collaborating that are not based on urgency, demand and stress.
                    </p>

                </div>
                <div className='col-start-15 col-end-20 flex items-end py-8'>
                    <div className='flex flex-col text-sm font-normal capitalize leading-tight gap-1'>
                        <div>About</div>
                        <div>Background and Approach</div>
                        <div>Relationship and Circulation</div>
                        <div>Colophon</div>
                        <div>Privacy and Terms</div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default AboutPage;
