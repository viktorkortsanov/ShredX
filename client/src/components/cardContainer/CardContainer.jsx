import { useTranslation } from "react-i18next";
import Card from "./card/Card.jsx";
import './cardcontainer.css';
import { Link } from "react-router-dom";

export default function CardContainer() {
    const { t } = useTranslation();

    return (
        <article id="features-section">
            <Link to="/programs">
                <Card
                    img="/images/personalization.png"
                    title={t("features.title_1_text")}
                    text={t("features.text_1_description")}
                />
            </Link>
            <Link to="/forum">
                <Card
                    img="/images/community.png"
                    title={t("features.title_2_text")}
                    text={t("features.text_2_description")}
                />
            </Link>
            <Link to="/">
                <Card
                    img="/images/task.png"
                    title={t("features.title_3_text")}
                    text={t("features.text_3_description")}
                />
            </Link>
        </article>
    );
}
