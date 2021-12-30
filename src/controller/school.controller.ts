import express from 'express';


type School = {
    id: number;
    name: string;
};



const router = express.Router();


const data = [
    {
        id: 1,
        name: '동북고',
    },
];

router.get('/', (req, res) => res.status(200).json(data));

router.get('/:schoolId', (req, res) => {
    const { schoolId } = req.params;
    if (!schoolId) {
        return res.status(400).json();
    }

    const schoolIdNumber = parseInt(schoolId, 10);
    if (!data.some(({ id }) => id === schoolIdNumber)) {
        return res.status(404).json();
    }
    const filtered = data.filter((item) => item.id === schoolIdNumber);
    return res.status(200).json(filtered[0]);
});


router.post('/', (req, res) => {
    const school: School = req.body as School;
    if (!school) {
        return res.status(400).json();
    }
    data.push(school);
    return res.status(201).json();
});


export default router;