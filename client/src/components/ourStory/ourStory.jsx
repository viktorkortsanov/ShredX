import { useTranslation } from 'react-i18next';
import './ourstory.css';

const OurStory = () => {
    const { t } = useTranslation();

    return (
        <div className="our-story-container">
            <section className="story-image-section hero-image">
                <div className="image-placeholder">
                    <img src="https://i.ytimg.com/vi/-8xSX8M6Y80/maxresdefault.jpg" alt="" />
                    <div className="overlay">
                        <h1>{t('navigation.ourStory')}</h1>
                    </div>
                </div>
            </section>
            <section className="story-text-section about-section">
                <div className="section-content">
                    <h2>{t('ourstory.about')}</h2>
                    <div className="divider"></div>
                    <p>
                    {t('ourstory.aboutp1')}
                    </p>
                    <p>
                    {t('ourstory.aboutp2')}
                    </p>
                </div>
            </section>
            <section className="story-image-section mission-image">
                <div className="image-placeholder">
                    <img src="https://sunnyhealthfitness.com/cdn/shop/articles/group-fitness-benefits-motivation-in-community-01.jpg?v=1700251086" alt="" />
                </div>
            </section>
            <section className="story-text-section mission-section">
                <div className="section-content">
                    <h2>{t('ourstory.mission')}</h2>
                    <div className="divider"></div>
                    <p>
                    {t('ourstory.missionp1')}
                    </p>
                    <p>
                    {t('ourstory.missionp2')}
                    </p>
                    <p>
                    {t('ourstory.missionp3')}
                    </p>
                </div>
            </section>
            <section className="story-image-section values-image">
                <div className="image-placeholder">
                    <img src="https://leicestercrossfit.co.uk/wp-content/uploads/2019/01/49769220_2181107085280573_9012105194019749888_n.jpg" alt="" />
                </div>
            </section>
            <section className="story-text-section journey-section">
                <div className="section-content">
                    <h2>{t('ourstory.jorney')}</h2>
                    <div className="divider"></div>
                    <p>
                    {t('ourstory.roadp1')}
                    </p>
                    <p>
                    {t('ourstory.roadp2')}
                    </p>
                    <p>
                    {t('ourstory.roadp3')}
                    </p>
                    <p>
                    {t('ourstory.roadp4')}
                    </p>
                </div>
            </section>
        </div>
    );
};
export default OurStory;