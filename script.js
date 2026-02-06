// Cursor Glow Effect
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

let currentVoice = 'female';
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;

// Poems Database
const poems = [
    {
        title: "Twinkle Twinkle Little Star",
        category: "bedtime",
        icon: "⭐",
        text: "Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.\nTwinkle, twinkle, little star,\nHow I wonder what you are!"
    },
    {
        title: "The Itsy Bitsy Spider",
        category: "animals",
        icon: "🕷️",
        text: "The itsy bitsy spider\nClimbed up the water spout.\nDown came the rain\nAnd washed the spider out.\nOut came the sun\nAnd dried up all the rain,\nAnd the itsy bitsy spider\nClimbed up the spout again."
    },
    {
        title: "Mary Had a Little Lamb",
        category: "animals",
        icon: "🐑",
        text: "Mary had a little lamb,\nLittle lamb, little lamb,\nMary had a little lamb,\nIts fleece was white as snow.\nAnd everywhere that Mary went,\nMary went, Mary went,\nEverywhere that Mary went,\nThe lamb was sure to go."
    },
    {
        title: "Rain Rain Go Away",
        category: "nature",
        icon: "🌧️",
        text: "Rain, rain, go away,\nCome again another day.\nLittle Johnny wants to play,\nRain, rain, go away!"
    },
    {
        title: "Humpty Dumpty",
        category: "fun",
        icon: "🥚",
        text: "Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall.\nAll the king's horses and all the king's men,\nCouldn't put Humpty together again."
    },
    {
        title: "Baa Baa Black Sheep",
        category: "animals",
        icon: "🐑",
        text: "Baa, baa, black sheep,\nHave you any wool?\nYes sir, yes sir,\nThree bags full.\nOne for the master,\nOne for the dame,\nAnd one for the little boy\nWho lives down the lane."
    },
    {
        title: "I'm a Little Teapot",
        category: "fun",
        icon: "🫖",
        text: "I'm a little teapot,\nShort and stout.\nHere is my handle,\nHere is my spout.\nWhen I get all steamed up,\nHear me shout,\nTip me over and pour me out!"
    },
    {
        title: "Five Little Ducks",
        category: "animals",
        icon: "🦆",
        text: "Five little ducks went out one day,\nOver the hill and far away.\nMother duck said, 'Quack, quack, quack, quack,'\nBut only four little ducks came back."
    },
    {
        title: "The Wheels on the Bus",
        category: "fun",
        icon: "🚌",
        text: "The wheels on the bus go round and round,\nRound and round, round and round.\nThe wheels on the bus go round and round,\nAll through the town!"
    },
    {
        title: "Row Row Row Your Boat",
        category: "nature",
        icon: "🚣",
        text: "Row, row, row your boat,\nGently down the stream.\nMerrily, merrily, merrily, merrily,\nLife is but a dream!"
    },
    {
        title: "Old MacDonald Had a Farm",
        category: "animals",
        icon: "🚜",
        text: "Old MacDonald had a farm,\nE-I-E-I-O!\nAnd on his farm he had a cow,\nE-I-E-I-O!\nWith a moo-moo here,\nAnd a moo-moo there,\nHere a moo, there a moo,\nEverywhere a moo-moo!"
    },
    {
        title: "Hickory Dickory Dock",
        category: "fun",
        icon: "🕐",
        text: "Hickory, dickory, dock,\nThe mouse ran up the clock.\nThe clock struck one,\nThe mouse ran down,\nHickory, dickory, dock!"
    },
    {
        title: "Three Little Kittens",
        category: "animals",
        icon: "🐱",
        text: "Three little kittens, they lost their mittens,\nAnd they began to cry.\n'Oh, mother dear, we sadly fear,\nOur mittens we have lost.'\n'What! Lost your mittens, you naughty kittens!\nThen you shall have no pie.'"
    },
    {
        title: "Jack and Jill",
        category: "fun",
        icon: "⛰️",
        text: "Jack and Jill went up the hill\nTo fetch a pail of water.\nJack fell down and broke his crown,\nAnd Jill came tumbling after."
    },
    {
        title: "Little Miss Muffet",
        category: "fun",
        icon: "🕷️",
        text: "Little Miss Muffet\nSat on a tuffet,\nEating her curds and whey.\nAlong came a spider,\nWho sat down beside her,\nAnd frightened Miss Muffet away!"
    },
    {
        title: "Hey Diddle Diddle",
        category: "fun",
        icon: "🐄",
        text: "Hey diddle diddle,\nThe cat and the fiddle,\nThe cow jumped over the moon.\nThe little dog laughed to see such sport,\nAnd the dish ran away with the spoon!"
    },
    {
        title: "Star Light Star Bright",
        category: "bedtime",
        icon: "🌟",
        text: "Star light, star bright,\nFirst star I see tonight.\nI wish I may, I wish I might,\nHave the wish I wish tonight."
    },
    {
        title: "The Rainbow",
        category: "nature",
        icon: "🌈",
        text: "Red and orange, yellow and green,\nThe prettiest rainbow I've ever seen!\nBlue and purple, colors so bright,\nShining in the sky with all their might!"
    },
    {
        title: "I Love My Family",
        category: "family",
        icon: "❤️",
        text: "I love my mommy, yes I do,\nI love my daddy, he loves me too.\nI love my sister and my brother,\nWe all love each other!"
    },
    {
        title: "Bedtime Song",
        category: "bedtime",
        icon: "🌙",
        text: "Time to sleep, close your eyes,\nDream of stars in moonlit skies.\nSoft and warm beneath your sheet,\nHave the sweetest dreams so sweet!"
    }
];

let currentPoem = null;

// Login Function
function login(type) {
    createCrackers();
    setTimeout(() => {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('mainContent').style.display = 'block';
        displayPoems('all');
    }, 1000);
}

// Display Poems
function displayPoems(category) {
    const grid = document.getElementById('poemsGrid');
    grid.innerHTML = '';
    
    const filtered = category === 'all' ? poems : poems.filter(p => p.category === category);
    
    filtered.forEach(poem => {
        const card = document.createElement('div');
        card.className = 'poem-card';
        card.innerHTML = `
            <div class="poem-icon">${poem.icon}</div>
            <div class="poem-title">${poem.title}</div>
        `;
        card.onclick = () => openPoem(poem);
        grid.appendChild(card);
    });
}

// Filter Category
function filterCategory(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    displayPoems(category);
}

// Open Poem Modal
function openPoem(poem) {
    createCrackers();
    currentPoem = poem;
    const modal = document.getElementById('poemModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <div class="poem-icon" style="font-size: 100px;">${poem.icon}</div>
        <h2 class="poem-title" style="font-size: 32px;">${poem.title}</h2>
        <div class="poem-text" id="poemText">
            ${poem.text.split('\n').map(line => `<div class="line">${line}</div>`).join('')}
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Close Modal
function closeModal() {
    document.getElementById('poemModal').style.display = 'none';
    stopReading();
}

// Set Voice
function setVoice(voice) {
    currentVoice = voice;
    alert(`Voice set to ${voice}! Click "Read Poem" to hear it! 🎵`);
}

// Read Poem with Text Highlighting
function readPoem() {
    if (!currentPoem) return;
    
    stopReading();
    
    const text = currentPoem.text;
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(v => 
        currentVoice === 'female' ? v.name.includes('Female') || v.name.includes('female') : v.name.includes('Male') || v.name.includes('male')
    ) || voices[0];
    
    currentUtterance.voice = selectedVoice;
    currentUtterance.rate = 0.8;
    currentUtterance.pitch = 1.2;
    
    const lines = document.querySelectorAll('#poemText .line');
    const words = text.split(/\s+/);
    let wordIndex = 0;
    
    currentUtterance.onboundary = (event) => {
        if (event.name === 'word') {
            lines.forEach(line => {
                line.innerHTML = line.textContent;
            });
            
            if (wordIndex < words.length) {
                const currentWord = words[wordIndex];
                lines.forEach(line => {
                    if (line.textContent.includes(currentWord)) {
                        line.innerHTML = line.textContent.replace(
                            currentWord,
                            `<span class="highlight">${currentWord}</span>`
                        );
                    }
                });
                wordIndex++;
            }
        }
    };
    
    speechSynthesis.speak(currentUtterance);
}

// Stop Reading
function stopReading() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    document.querySelectorAll('#poemText .line').forEach(line => {
        line.innerHTML = line.textContent;
    });
}

// Create Cracker Effect
function createCrackers() {
    const colors = ['#ff6ec4', '#7873f5', '#00d4ff', '#ffeb3b', '#ff5252'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const cracker = document.createElement('div');
            cracker.className = 'cracker';
            cracker.style.left = Math.random() * window.innerWidth + 'px';
            cracker.style.top = Math.random() * window.innerHeight + 'px';
            cracker.style.width = '10px';
            cracker.style.height = '10px';
            cracker.style.background = colors[Math.floor(Math.random() * colors.length)];
            cracker.style.borderRadius = '50%';
            cracker.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
            cracker.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
            cracker.style.animation = 'explode 1s ease-out forwards';
            
            document.body.appendChild(cracker);
            
            setTimeout(() => cracker.remove(), 1000);
        }, i * 30);
    }
}

// Initialize Speech Synthesis
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {};
}