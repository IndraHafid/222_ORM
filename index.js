const express = require('express');
const app = express();
const db = require('./models');
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({
    extended: true  
}));

app.listen(PORT, () => {
    console.log('sever started on port 3001');
})

db.sequelize.sync()
    .then((result) => {
        app.listen(3001,() => {
            console.log('Server Started');
        })
    })
    .catch((err) => {  
        console.log(err);
    })

app.post("/komik", async (req, res) => {
    const data = req.body;
    try {
        const komik = await db.Komik.create(data);
        res.status(201).send({
            message: "Komik berhasil ditambahkan!",
            komik: komik
        });
    } catch (err) {
        res.status(500).send
    }
});

app.get('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.send(komik);
    }
    catch (err) {
        res.send(err);
    }
});

app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({ message: 'Komik tidak ditemukan' });
        }

        await komik.update(data);
        res.send({ message: 'Komik berhasil diupdate', komik });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/komik/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({ message: 'Komik tidak ditemukan' });
        }
        await komik.destroy();
        res.send({ message: 'Komik berhasil dihapus' });
    } catch (err) {
        res.status(500).send(err);
    }
});
