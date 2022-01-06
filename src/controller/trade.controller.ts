import express from "express";
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

router.get("/articles", async (req, res) => {
    const articles = await Article.findAll();
    return res.status(200).json(articles);
});


export default router;