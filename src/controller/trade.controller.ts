import express from "express";
import { where } from "sequelize/dist";
import Article from "../model/aritcle.model";

type NewArticle = {
    title: string;
    description: string;
    image: string;
    location: string;
    price: number;
    isAdjustable: boolean;
};

const router = express.Router();


router.post("/articles", async (req, res) => {
    const NewArticle: NewArticle = req.body as NewArticle;
    if (!NewArticle) {
        return res.status(400).json();
    }

    const article = await Article.create({
        title: NewArticle.title,
        description: NewArticle.description,
        image: NewArticle.image,
        location: NewArticle.location,
        price: NewArticle.price,
        isAdjustable: NewArticle.isAdjustable,

    });

    return res.status(201).json({
        id: article.id,
    });
});

router.get("/articles/:articleid", async (req, res) => {
    const { articleid } = req.params;
    if (!articleid) {
        return res.status(400).json();
    }

    const articleIDNumber = parseInt(articleid, 10);
    const article = await Article.findOne({
        where: {
            id: articleIDNumber,
        },
    });

    if (!article) {
        return res.status(404).json();
    }
    return res.status(200).json(article);
});


router.get("/articles", async (req, res) => {
    const { location } = req.query;

    if (location) {
        const articles = await Article.findAll({
            where: {
                location: location,
            },
        });
        return res.status(200).json(articles);
    }
    const articles = await Article.findAll();
    return res.status(200).json(articles);
});


export default router;