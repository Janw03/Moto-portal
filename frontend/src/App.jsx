import { useState, useEffect } from 'react'
import './App.css'

// --- DANE POMOCNICZE ---
const MARKI_MODELE = {
  "Alfa Romeo": ["Giulia", "Stelvio", "Giulietta"],
  "Audi": ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT"],
  "BMW": ["Seria 1", "Seria 2", "Seria 3", "Seria 4", "Seria 5", "Seria 7", "X1", "X3", "X5", "M3", "M5"],
  "Citroen": ["C3", "C4", "C5", "Berlingo", "C3 Aircross"],
  "Cupra": ["Formentor", "Leon", "Ateca"],
  "Dacia": ["Duster", "Sandero", "Logan", "Jogger"],
  "Fiat": ["500", "Tipo", "Panda", "500X"],
  "Ford": ["Fiesta", "Focus", "Mondeo", "Mustang", "Kuga", "Puma", "Ranger"],
  "Honda": ["Civic", "CR-V", "HR-V", "Jazz"],
  "Hyundai": ["i10", "i20", "i30", "Tucson", "Santa Fe", "Kona", "IONIQ 5"],
  "Kia": ["Ceed", "Sportage", "Rio", "Stinger", "Niro", "EV6", "Sorento"],
  "Lexus": ["RX", "NX", "UX", "IS", "LS"],
  "Mazda": ["2", "3", "6", "CX-30", "CX-5", "MX-5"],
  "Mercedes-Benz": ["Klasa A", "Klasa C", "Klasa E", "Klasa S", "CLA", "GLC", "GLE", "G-Klasa"],
  "Nissan": ["Qashqai", "Juke", "X-Trail", "Leaf", "Micra"],
  "Opel": ["Corsa", "Astra", "Insignia", "Mokka", "Grandland"],
  "Peugeot": ["208", "308", "508", "2008", "3008", "5008"],
  "Porsche": ["911", "Cayenne", "Panamera", "Taycan", "Macan"],
  "Renault": ["Clio", "Megane", "Captur", "Austral", "Arkana", "Zoe"],
  "Seat": ["Ibiza", "Leon", "Ateca", "Arona", "Tarraco"],
  "Skoda": ["Fabia", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Enyaq"],
  "Subaru": ["Forester", "Outback", "Impreza"],
  "Suzuki": ["Swift", "Vitara", "S-Cross", "Jimny"],
  "Tesla": ["Model 3", "Model Y", "Model S", "Model X"],
  "Toyota": ["Aygo X", "Yaris", "Corolla", "Camry", "RAV4", "C-HR", "Highlander", "Land Cruiser"],
  "Volkswagen": ["Polo", "Golf", "Passat", "Arteon", "T-Roc", "Tiguan", "Touareg", "ID.3", "ID.4"],
  "Volvo": ["XC40", "XC60", "XC90", "S60", "V60", "V90"]
};

const WOJEWODZTWA_MIASTA = {
  "Dolnośląskie": ["Wrocław", "Legnica", "Wałbrzych", "Jelenia Góra", "Lubin", "Głogów", "Polkowice", "Lubań", "Zgorzelec", "Bolesławiec", "Jawor", "Złotoryja", "Kamienna Góra", "Dzierżoniów", "Świdnica", "Strzelin", "Oława", "Oleśnica", "Trzebnica", "Milicz", "Wołów", "Środa Śląska", "Lwówek Śląski", "Kłodzko", "Bystrzyca Kłodzka", "Ząbkowice Śląskie"],
  "Kujawsko-Pomorskie": ["Bydgoszcz", "Toruń", "Włocławek", "Grudziądz", "Inowrocław", "Brodnica", "Świecie", "Chełmno", "Nakło nad Notecią", "Sępólno Krajeńskie", "Tuchola", "Żnin", "Mogilno", "Radziejów", "Aleksandrów Kujawski", "Golub-Dobrzyń", "Rypin", "Lipno", "Wąbrzeźno"],
  "Lubelskie": ["Lublin", "Zamość", "Chełm", "Biała Podlaska", "Puławy", "Świdnik", "Lubartów", "Łęczna", "Kraśnik", "Janów Lubelski", "Biłgoraj", "Tomaszów Lubelski", "Hrubieszów", "Krasnystaw", "Włodawa", "Parczew", "Radzyń Podlaski", "Łuków", "Ryki", "Opole Lubelskie"],
  "Lubuskie": ["Gorzów Wielkopolski", "Zielona Góra", "Nowa Sól", "Żary", "Żagań", "Świebodzin", "Międzyrzecz", "Słubice", "Sulęcin", "Krosno Odrzańskie", "Strzelce Krajeńskie", "Wschowa"],
  "Łódzkie": ["Łódź", "Piotrków Trybunalski", "Skierniewice", "Pabianice", "Zgierz", "Kutno", "Łowicz", "Łęczyca", "Poddębice", "Sieradz", "Zduńska Wola", "Wieluń", "Pajęczno", "Radomsko", "Bełchatów", "Opoczno", "Tomaszów Mazowiecki", "Rawa Mazowiecka", "Brzeziny"],
  "Małopolskie": ["Kraków", "Tarnów", "Nowy Sącz", "Bochnia", "Brzesko", "Chrzanów", "Dąbrowa Tarnowska", "Gorlice", "Limanowa", "Miechów", "Myślenice", "Nowy Targ", "Olkusz", "Oświęcim", "Proszowice", "Sucha Beskidzka", "Wadowice", "Wieliczka", "Zakopane"],
  "Mazowieckie": ["Warszawa", "Radom", "Płock", "Siedlce", "Ostrołęka", "Ciechanów", "Mława", "Pułtusk", "Maków Mazowiecki", "Przasnysz", "Ostrołęka", "Ostrów Mazowiecka", "Wyszków", "Wołomin", "Legionowo", "Nowy Dwór Mazowiecki", "Grodzisk Mazowiecki", "Pruszków", "Piaseczno", "Otwock", "Mińsk Mazowiecki", "Siedlce", "Sokołów Podlaski", "Węgrów", "Garwolin", "Kozienice", "Zwoleń", "Białobrzegi", "Grójec", "Żyrardów", "Sochaczew", "Płock", "Gostynin", "Sierpc", "Żuromin"],
  "Opolskie": ["Opole", "Kędzierzyn-Koźle", "Nysa", "Brzeg", "Kluczbork", "Namysłów", "Olesno", "Strzelce Opolskie", "Krapkowice", "Głubczyce", "Prudnik"],
  "Podkarpackie": ["Rzeszów", "Przemyśl", "Krosno", "Tarnobrzeg", "Mielec", "Dębica", "Ropczyce", "Kolbuszowa", "Leżajsk", "Łańcut", "Przeworsk", "Jarosław", "Lubaczów", "Przemyśl", "Brzozów", "Sanok", "Lesko", "Ustrzyki Dolne", "Nisko", "Stalowa Wola", "Tarnobrzeg", "Strzyżów"],
  "Podlaskie": ["Białystok", "Łomża", "Suwałki", "Augustów", "Sejny", "Sokółka", "Mońki", "Bielsk Podlaski", "Hajnówka", "Siemiatycze", "Wysokie Mazowieckie", "Zambrów", "Kolno", "Grajewo"],
  "Pomorskie": ["Gdańsk", "Gdynia", "Sopot", "Słupsk", "Bytów", "Chojnice", "Człuchów", "Kościerzyna", "Kartuzy", "Wejherowo", "Puck", "Lębork", "Malbork", "Nowy Dwór Gdański", "Starogard Gdański", "Tczew", "Kwidzyn", "Sztum"],
  "Śląskie": ["Katowice", "Częstochowa", "Gliwice", "Bytom", "Zabrze", "Ruda Śląska", "Dąbrowa Górnicza", "Sosnowiec", "Jaworzno", "Tychy", "Mysłowice", "Siemianowice Śląskie", "Świętochłowice", "Chorzów", "Rybnik", "Jastrzębie-Zdrój", "Żory", "Bielsko-Biała", "Cieszyn", "Żywiec", "Pszczyna", "Oświęcim", "Racibórz", "Wodzisław Śląski", "Tarnowskie Góry", "Lubliniec", "Myszków", "Zawiercie"],
  "Świętokrzyskie": ["Kielce", "Ostrowiec Świętokrzyski", "Starachowice", "Skarżysko-Kamienna", "Sandomierz", "Staszów", "Busko-Zdrój", "Kazimierza Wielka", "Jędrzejów", "Włoszczowa", "Pińczów", "Opatów", "Końskie"],
  "Warmińsko-Mazurskie": ["Olsztyn", "Elbląg", "Ełk", "Giżycko", "Mrągowo", "Kętrzyn", "Bartoszyce", "Lidzbark Warmiński", "Braniewo", "Iława", "Nowe Miasto Lubawskie", "Działdowo", "Szczytno", "Nidzica", "Pisz", "Olecko", "Gołdap", "Węgorzewo", "Ostróda"],
  "Wielkopolskie": ["Poznań", "Kalisz", "Konin", "Leszno", "Piła", "Gniezno", "Września", "Środa Wielkopolska", "Śrem", "Kościan", "Gostyń", "Rawicz", "Ostrów Wielkopolski", "Krotoszyn", "Jarocin", "Pleszew", "Turek", "Koło", "Słupca", "Wągrowiec", "Chodzież", "Czarnków", "Międzychód", "Szamotuły", "Nowy Tomyśl", "Grodzisk Wielkopolski", "Oborniki", "Złotów"],
  "Zachodniopomorskie": ["Szczecin", "Koszalin", "Świnoujście", "Stargard", "Gryfino", "Police", "Goleniow", "Goleniów", "Kamień Pomorski", "Gryfice", "Łobez", "Drawsko Pomorskie", "Świdwin", "Kołobrzeg", "Białogard", "Szczecinek", "Wałcz", "Choszczno", "Pyrzyce", "Myślibórz", "Sławno"]
};

const GENERUJ_CENY = () => {
  let ceny = [2000, 3000, 5000];
  for (let i = 10000; i <= 100000; i += 5000) ceny.push(i);
  for (let i = 150000; i <= 1000000; i += 50000) ceny.push(i);
  return ceny;
};

const GENERUJ_PRZEBIEG = () => {
  let przebiegi = [5000, 10000, 20000, 30000, 40000];
  for (let i = 50000; i <= 300000; i += 50000) przebiegi.push(i);
  przebiegi.push(400000, 500000);
  return przebiegi;
};

const LATA = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => 1990 + i).reverse();
const PALIWA = ["Benzyna", "Benzyna + LPG", "Diesel", "Elektryczny", "Hybryda", "Hybryda plug-in"];
const KATEGORIE = ["Osobowe", "Elektryczne", "Ciężarowe", "Budowlane","Dostawcze", "Motocykle", "Przyczepy", "Rolnicze", "Części"];
const SKRZYNIE = ["Manualna", "Automatyczna"];
const STANY_USZKODZEN = ["Nieuszkodzony", "Uszkodzony"];

function App() {
  const [ogloszenia, setOgloszenia] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null); 
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); 
  const [loginData, setLoginData] = useState({ email: '', password: '', name: '' });
  const [loginError, setLoginError] = useState('');
  const [ulubione, setUlubione] = useState([]);
  const [filterStanUszkodzen, setFilterStanUszkodzen] = useState('');

  // --- STANY FILTRÓW ---
  const [activeKategoria, setActiveKategoria] = useState('Osobowe');
  const [filterTransakcja, setFilterTransakcja] = useState('Kup');
  const [searchMarka, setSearchMarka] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [filterCenaMax, setFilterCenaMax] = useState('');
  const [filterPaliwo, setFilterPaliwo] = useState('');
  const [filterRokMin, setFilterRokMin] = useState('');
  const [filterStan, setFilterStan] = useState('');
  const [filterSkrzynia, setFilterSkrzynia] = useState('');
  const [filterPrzebiegMax, setFilterPrzebiegMax] = useState('');
  const [filterWojewodztwo, setFilterWojewodztwo] = useState('');
  const [filterMiasto, setFilterMiasto] = useState('');

  // Czyszczenie pól zależnych
  useEffect(() => { setFilterModel(''); }, [searchMarka]);
  useEffect(() => { setFilterMiasto(''); }, [filterWojewodztwo]);

  // --- STAN FORMULARZA ---
  const [formData, setFormData] = useState({
    marka: '', model: '', cena: '', rok: '', paliwo: 'Benzyna', 
    skrzynia: 'Manualna', przebieg: '', stan: 'Używany', 
    miasto: '', wojewodztwo: 'Mazowieckie', telefon: '', opis: '', img: '',
    stanUszkodzen: 'Nieuszkodzony'
  });

  const fetchOgloszenia = () => {
    fetch('http://localhost:5000/api/ogloszenia')
      .then(res => res.json())
      .then(data => setOgloszenia(data))
      .catch(err => console.error("Błąd pobierania:", err));
  };

  useEffect(() => { fetchOgloszenia(); }, []);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/api/register' : '/api/login';
    fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
    .then(res => res.json())
    .then(userData => {
      setUser(userData); 
      setShowLoginModal(false);
    })
    .catch(() => setLoginError("Błąd logowania"));
  };

  const handleLogout = () => { setUser(null); setShowForm(false); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const daneZAutorem = { ...formData, autor: user.email };
    fetch('http://localhost:5000/api/ogloszenia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(daneZAutorem)
    })
    .then(() => {
      fetchOgloszenia();
      setShowForm(false);
      setFormData({
        marka: '', model: '', cena: '', rok: '', paliwo: 'Benzyna',
        skrzynia: 'Manualna', przebieg: '', stan: 'Używany', 
        miasto: '', wojewodztwo: 'Mazowieckie', telefon: '', opis: '', img: ''
      });
    });
  };

  const toggleUlubione = (id) => {
    setUlubione(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const pasujeStanUszk = filterStanUszkodzen === '' || a.stanUszkodzen === filterStanUszkodzen;



  // LOGIKA FILTROWANIA ---
  const przefiltrowane = ogloszenia.filter(a => {
    const pasujeMarka = searchMarka === '' || a.marka === searchMarka;
    const pasujeModel = filterModel === '' || a.model === filterModel;
    const pasujeCena = filterCenaMax === '' || Number(a.cena) <= Number(filterCenaMax);
    const pasujePaliwo = filterPaliwo === '' || a.paliwo === filterPaliwo;
    const pasujeRok = filterRokMin === '' || Number(a.rok) >= Number(filterRokMin);
    const pasujeStan = filterStan === '' || a.stan === filterStan;
    const pasujeSkrzynia = filterSkrzynia === '' || a.skrzynia === filterSkrzynia;
    const pasujePrzebieg = filterPrzebiegMax === '' || Number(a.przebieg) <= Number(filterPrzebiegMax);
    const pasujeWoj = filterWojewodztwo === '' || a.wojewodztwo === filterWojewodztwo;
    const pasujeMiasto = filterMiasto === '' || a.miasto === filterMiasto;
    const pasujeStanUszk = filterStanUszkodzen === '' || a.stanUszkodzen === filterStanUszkodzen;

    return pasujeMarka && pasujeModel && pasujeCena && pasujeRok && 
           pasujePaliwo && pasujeStan && pasujeSkrzynia && 
           pasujePrzebieg && pasujeWoj && pasujeMiasto && pasujeStanUszk;
  });

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">MotoPortal</div>
          <div className="nav-actions">
            {user ? (
              <>
                <span className="user-welcome">Witaj, {user.name}!</span>
                <button className="add-btn" onClick={() => setShowForm(!showForm)}>{showForm ? "Anuluj" : "+ Dodaj ogłoszenie"}</button>
                <button className="logout-btn" onClick={handleLogout}>Wyloguj</button>
              </>
            ) : (
              <button className="login-btn" onClick={() => setShowLoginModal(true)}>Zaloguj się</button>
            )}
          </div>
        </div>
      </nav>

      {showLoginModal && (
        <div className="modal-overlay">
          <div className="login-modal">
            <h2>{isRegistering ? "Załóż konto" : "Logowanie"}</h2>
            <form onSubmit={handleAuthSubmit}>
              {isRegistering && (
                <input 
                  type="text" 
                  placeholder="Imię" 
                  required 
                  value={loginData.name}
                  onChange={e => setLoginData({...loginData, name: e.target.value})} 
                />
              )}
              <input 
                type="email" 
                placeholder="E-mail" 
                required 
                value={loginData.email}
                onChange={e => setLoginData({...loginData, email: e.target.value})} 
              />
              <input 
                type="password" 
                placeholder="Hasło" 
                required 
                value={loginData.password}
                onChange={e => setLoginData({...loginData, password: e.target.value})} 
              />
              
              {loginError && <p style={{color: 'red', fontSize: '14px', marginBottom: '10px'}}>{loginError}</p>}
              
              <button type="submit" className="submit-btn">
                {isRegistering ? "Zarejestruj się" : "Zaloguj się"}
              </button>

              <p style={{marginTop: '15px', fontSize: '14px', color: '#555'}}>
                {isRegistering ? "Masz już konto? " : "Nie masz konta? "}
                <span 
                  style={{color: '#007bff', cursor: 'pointer', fontWeight: 'bold'}}
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setLoginError('');
                  }}
                >
                  {isRegistering ? "Zaloguj się" : "Zarejestruj się"}
                </span>
              </p>

              <button type="button" className="cancel-btn" onClick={() => {
                setShowLoginModal(false);
                setLoginError('');
              }}>
                Anuluj
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="search-section">
        <div className="category-tabs">
          {KATEGORIE.map(cat => (
            <button key={cat} className={`tab-btn ${activeKategoria === cat ? 'active-tab' : ''}`} onClick={() => setActiveKategoria(cat)}>{cat}</button>
          ))}
        </div>

        <div className="filter-wrapper">
          <div className="filter-row">
            <select value={searchMarka} onChange={e => setSearchMarka(e.target.value)}>
              <option value="">Marka pojazdu</option>
              {Object.keys(MARKI_MODELE).sort().map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select disabled={!searchMarka} value={filterModel} onChange={e => setFilterModel(e.target.value)}>
              <option value="">Model pojazdu</option>
              {searchMarka && MARKI_MODELE[searchMarka]?.map(mod => <option key={mod} value={mod}>{mod}</option>)}
            </select>
            <select value={filterCenaMax} onChange={e => setFilterCenaMax(e.target.value)}>
              <option value="">Cena do</option>
              {GENERUJ_CENY().map(c => <option key={c} value={c}>{c.toLocaleString()} PLN</option>)}
            </select>
            <select value={filterRokMin} onChange={e => setFilterRokMin(e.target.value)}>
              <option value="">Rok produkcji od</option>
              {LATA.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={filterStanUszkodzen} onChange={e => setFilterStanUszkodzen(e.target.value)}>
              <option value="">Stan (Wszystkie)</option>
              {STANY_USZKODZEN.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="filter-row">
            <select value={filterPrzebiegMax} onChange={e => setFilterPrzebiegMax(e.target.value)}>
              <option value="">Przebieg do</option>
              {GENERUJ_PRZEBIEG().map(p => <option key={p} value={p}>{p.toLocaleString()} km</option>)}
            </select>
            <select value={filterSkrzynia} onChange={e => setFilterSkrzynia(e.target.value)}>
              <option value="">Skrzynia biegów (Wszystkie)</option>
              {SKRZYNIE.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={filterPaliwo} onChange={e => setFilterPaliwo(e.target.value)}>
              <option value="">Rodzaj paliwa</option>
              {PALIWA.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={filterStan} onChange={e => setFilterStan(e.target.value)}>
              <option value="">Stan (Wszystkie)</option>
              <option value="Nowy">Nowy</option>
              <option value="Używany">Używany</option>
            </select>
          </div>

          <div className="filter-row">
            <select value={filterWojewodztwo} onChange={e => setFilterWojewodztwo(e.target.value)}>
              <option value="">Województwo (Cała Polska)</option>
              {Object.keys(WOJEWODZTWA_MIASTA).sort().map(w => <option key={w} value={w}>{w}</option>)}
            </select>
            <select disabled={!filterWojewodztwo} value={filterMiasto} onChange={e => setFilterMiasto(e.target.value)}>
              <option value="">Miejscowość</option>
              {filterWojewodztwo && WOJEWODZTWA_MIASTA[filterWojewodztwo]?.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <div className="toggle-group">
              <button className={`toggle-btn ${filterTransakcja === 'Kup' ? 'active' : ''}`} onClick={() => setFilterTransakcja('Kup')}>Kup</button>
              <button className={`toggle-btn ${filterTransakcja === 'Leasing' ? 'active' : ''}`} onClick={() => setFilterTransakcja('Leasing')}>Leasing</button>
            </div>
            <button className="search-main-btn">Pokaż {przefiltrowane.length} Ogłoszeń</button>
          </div>
        </div>
      </div>

      {user && showForm && (
  <form className="add-form" onSubmit={handleSubmit}>
    <h2>Dodaj ogłoszenie</h2>
    <div className="form-grid">
      <select required value={formData.marka} onChange={e => setFormData({...formData, marka: e.target.value})}>
        <option value="">Wybierz markę</option>
        {Object.keys(MARKI_MODELE).sort().map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      <select required disabled={!formData.marka} value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})}>
        <option value="">Wybierz model</option>
        {formData.marka && MARKI_MODELE[formData.marka].map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      <input type="number" placeholder="Cena (PLN)" required value={formData.cena} onChange={e => setFormData({...formData, cena: e.target.value})} />
      
      <input type="number" placeholder="Rok produkcji" required value={formData.rok} onChange={e => setFormData({...formData, rok: e.target.value})} />
      
      <input type="number" placeholder="Przebieg (km)" required value={formData.przebieg} onChange={e => setFormData({...formData, przebieg: e.target.value})} /> 

      <select value={formData.skrzynia} onChange={e => setFormData({...formData, skrzynia: e.target.value})}>
        {SKRZYNIE.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <select value={formData.paliwo} onChange={e => setFormData({...formData, paliwo: e.target.value})}>
        {PALIWA.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      <select value={formData.wojewodztwo} onChange={e => setFormData({...formData, wojewodztwo: e.target.value})}>
        {Object.keys(WOJEWODZTWA_MIASTA).map(w => <option key={w} value={w}>{w}</option>)}
      </select>

      <select value={formData.stanUszkodzen} onChange={e => setFormData({...formData, stanUszkodzen: e.target.value})}>
        {STANY_USZKODZEN.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <input type="text" placeholder="Miejscowość" required value={formData.miasto} onChange={e => setFormData({...formData, miasto: e.target.value})} />
      
      <input type="tel" placeholder="Nr telefonu" required value={formData.telefon} onChange={e => setFormData({...formData, telefon: e.target.value})} />
      
      <input type="text" placeholder="URL zdjęcia" value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} />
    </div>
    
    <textarea placeholder="Opis..." value={formData.opis} onChange={e => setFormData({...formData, opis: e.target.value})}></textarea>
    
    <button type="submit" className="submit-btn">Opublikuj ogłoszenie</button>
  </form>
)}

      <main className="main-content">
        <div className="ads-grid">
          {przefiltrowane.length > 0 ? przefiltrowane.map(auto => (
            <div key={auto.id} className="ad-card">
              <div className="ad-image">
                <img src={auto.img || "https://via.placeholder.com/300x200?text=Auto"} alt="Foto" />
                {user && <button className={`fav-btn ${ulubione.includes(auto.id) ? 'active' : ''}`} onClick={() => toggleUlubione(auto.id)}>❤</button>}
              </div>
              <div className="ad-info">
                <h3 className="ad-title">
                  {auto.marka} {auto.model} 
                  {auto.stanUszkodzen === "Uszkodzony" && <span style={{color: 'red', fontSize: '12px', marginLeft: '10px'}}>(Uszkodzony)</span>}
                </h3>
                <p className="ad-location">📍 {auto.miasto} ({auto.wojewodztwo})</p>
                <p className="ad-params">
                  <span>{auto.rok}</span> • <span>{auto.paliwo}</span> • <span>{auto.skrzynia}</span> • <span>{auto.przebieg} km</span>
                </p>
                <p className="ad-price">{Number(auto.cena).toLocaleString()} PLN</p>
                <a href={`tel:${auto.telefon}`} className="phone-link">📞 {auto.telefon}</a>
              </div>
            </div>
          )) : <p className="no-results">Brak ogłoszeń spełniających kryteria.</p>}
        </div>
      </main>
    </div>
  );
}

export default App;