const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Baza użytkowników w pamięci RAM
let users = [
  { email: "admin@moto.pl", password: "123", name: "Administrator", role: "admin" },
  { email: "user@moto.pl", password: "123", name: "Jan Kowalski", role: "user" }
];

// Baza ogłoszeń - teraz z kompletem pól dla filtrów
let ogłoszenia = [
  { 
    id: 1, 
    marka: "Audi", 
    model: "A4", 
    cena: 45000, 
    rok: 2012, 
    paliwo: "Diesel", 
    przebieg: 185000, 
    miasto: "Mielec", 
    wojewodztwo: "Podkarpackie",
    stan: "Używany",
    telefon: "123456789",
    salon: "Polska"
  },
  { 
    id: 2, 
    marka: "Toyota", 
    model: "Yaris", 
    cena: 25000, 
    rok: 2015, 
    paliwo: "Benzyna", 
    przebieg: 95000, 
    miasto: "Warszawa", 
    wojewodztwo: "Mazowieckie",
    stan: "Używany",
    telefon: "987654321",
    salon: "Niemcy"
  }
];

// 1. Pobieranie ogłoszeń (GET)
app.get('/api/ogloszenia', (req, res) => {
  res.json(ogłoszenia);
});

// 2. Dodawanie ogłoszeń (POST)
app.post('/api/ogloszenia', (req, res) => {
  // Frontend wysyła teraz dużo więcej pól, spakujemy je wszystkie
  const noweAuto = { id: Date.now(), ...req.body };
  ogłoszenia.push(noweAuto);
  res.status(201).json(noweAuto);
});

// 3. Usuwanie ogłoszeń (DELETE)
app.delete('/api/ogloszenia/:id', (req, res) => {
  const { id } = req.params;
  // Używamy Number(id), żeby mieć pewność, że typy się zgadzają
  ogłoszenia = ogłoszenia.filter(auto => auto.id !== Number(id));
  res.json({ message: "Usunięto ogłoszenie" });
});

// 4. Logowanie (POST)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const foundUser = users.find(u => u.email === email && u.password === password);
  
  if (foundUser) {
    const { password: _, ...userWithoutPassword } = foundUser;
    res.json(userWithoutPassword);
  } else {
    res.status(401).json({ message: "Błędny e-mail lub hasło" });
  }
});

// 5. Rejestracja (POST)
app.post('/api/register', (req, res) => {
  const { email, password, name } = req.body;

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "Użytkownik o tym adresie e-mail już istnieje" });
  }

  const newUser = { email, password, name, role: "user" };
  users.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));