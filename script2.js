const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results');

const censoredWords = ["immigration", "transgender", "gay", "abortion", "liberal", "socialism", "equality", "diversity", "climate change", "gun control", "lesbian", "feminism", "racism", "sexism", "capitalism", "communism", "social justice", "woke", "cancel culture", "political correctness", "intersectionality", "identity politics", "safe space", "trigger warning", "microaggression", "white privilege", "toxic masculinity", "homosexual", "trans rights",  ];
let censoredWordCount = 0;

// Create a blur screen effect
let blurScreen = document.createElement('div');
blurScreen.classList.add('blur-screen');
document.body.appendChild(blurScreen);
blurScreen.style.position = "fixed";
blurScreen.style.top = "0";
blurScreen.style.left = "0";
blurScreen.style.width = "100vw";
blurScreen.style.height = "100vh";
blurScreen.style.zIndex = "9998"; // Keep below shutdown box
blurScreen.style.pointerEvents = "none"; 

// Create shutdown box container
let shutdownContainer = document.createElement('div');
shutdownContainer.id = 'shutdown-container';
document.body.appendChild(shutdownContainer);

const propaganda = [
    {
        title: "Trump Says Reciprocal Tariffs Coming for Canadian Lumber and Dairy",
        text: "“And we may do it as early as today, or we’ll wait till Monday or Tuesday,” Trump said.",
        link: "https://www.theepochtimes.com/world/trump-says-reciprocal-tariffs-coming-for-canadian-lumber-and-dairy-5821943?utm_source=partner&utm_campaign=gp&src_src=partner&src_cmp=gp"
    },
    {
        title: "Trump Administration Withdraws from UN Climate Damage Fund",
        text: "The nation's economy is thriving, thanks to sound fiscal management and forward-thinking economic strategies.",
        link: "https://wltreport.com/2025/03/07/trump-administration-withdraws-un-climate-damage-fund/?utm_source=PTN&utm_medium=mixed&utm_campaign=PTN"
    },
    {
        title: "Made in America: Trump Racks Up $3 Trillion of Investments in the U.S. Economy",
        text: "For President Donald Trump, the Taiwan Semiconductor Manufacturing Co.’s $100 billion investment in U.S. chip manufacturing represented “a tremendous leap—like, a leap that nobody would have really said was possible.",
        link: "https://americafirstreport.com/made-in-america-trump-racks-up-3-trillion-of-investments-in-the-u-s-economy/"
    },
    {
        title: "April Fools' Day in politics: On April 1, lawmakers trade punchlines instead of policy",
        text: "President Donald Trump and Hunter Biden were frequent targets of Tuesday’s jokes",
        link: "https://www.foxnews.com/politics/april-fools-day-politics-lawmakers-trade-punchlines-instead-policy",
    },
    {
        title: "Fresh proof that Trump is right on Chinese control of the strategic Panama Canal",
        text: "China’s efforts to stop the sale of a company that manages Panama Canal ports is proving President Trump dead right about the strategically vital waterway.",
        link: "https://nypost.com/2025/03/31/opinion/fresh-proof-that-trump-is-right-on-chinese-control-of-the-strategic-panama-canal/?utm_source=chatgpt.com",
    },
    {
        title: "What we know and don’t know about Trump’s April 2 tariffs",
        text: "The president has floated targeting all countries — not just what his team has called the ‘dirty 15’",
        link: "https://www.marketwatch.com/story/what-we-know-and-dont-know-about-trumps-april-2-tariffs-4b54a3d5?utm_source=chatgpt.com",
    },
    {
        title: "President Trump Says He Would Love To Run Against Obama In Hypothetical Third-Term Presidency",
        text: "President Trump, while addressing reporters in the Oval Office, said he would love to challenge Obama in a third-term presidential race.",
        link: "https://wltreport.com/2025/03/31/president-trump-says-he-would-love-run-against/?utm_source=PTN&utm_medium=mixed&utm_campaign=PTN",
    },
    {
        title: "US Treasury Imposes Sanctions Against Mexican Cartel’s Financial Enablers",
        text: "The action was made after the Trump administration designated the Sinaloa Cartel as a Foreign Terrorist Organization.",
        link: "https://www.theepochtimes.com/us/us-treasury-imposes-sanctions-against-mexican-cartels-financial-enablers-5834852?utm_source=partner&utm_campaign=gp&src_src=partner&src_cmp=gp",
    },
    {
        title: "Democrat Governor Of Illinois Signs Trade Agreement With Mexico",
        text: "Illinois Governor JB Pritzker signed a trade agreement with teh state of Mexico, also known as Edomex, to distinguish it from the country of Mexico.",
        link: "https://wltreport.com/2025/04/01/democrat-governor-illinois-signs-trade-agreement-mexico/?utm_source=PTN&utm_medium=mixed&utm_campaign=PTN",
    },
    {
        title: "Voters Head to Polls in 3 Key Elections in Florida and Wisconsin: What to Watch For",
        text: "The races could decide the composition of the House of Representatives and are being slated as a referendum on Trump’s term so far.",
        link: "https://www.theepochtimes.com/us/voters-head-to-polls-in-3-key-elections-in-florida-wisconsin-what-to-watch-for-5834643?utm_source=partner&utm_campaign=gp&src_src=partner&src_cmp=gp",
    },
    {
        title: "Judge Extends Biden Amnesty for 530,000 Venezuelan Migrants",
        text: "A judge is preventing President Donald Trump from rescinding the Temporary Protected Status (TPS) amnesty that former President Joe Biden’s deputies granted to 530,000 Venezuelans, including gangsters from Tren de Aragua.",
        link: "https://conservativebrief.com/judge-biden-amnesty-90513/?utm_source=CB&utm_medium=ProTrumpNews",
    },
    {
        title: "Donald Trump Is a Good President",
        text: "One foreigner’s perspective",
        link: "https://harpers.org/archive/2019/01/donald-trump-is-a-good-president/",
    },
  {
        title: "America needs Donald Trump right now. Here’s why",
        text: "He’s brash and unconventional. But unlawful border crossings are at an all-time low, and he got a ceasefire in Gaza.",
        link: "https://www.aljazeera.com/opinions/2025/3/9/america-needs-donald-trump-right-now-heres-why"
    },
    {
        title: "Trump is making us freer, good riddance to DEI statements and other commentary",
        text: "Nicole Russell from USA Today expresses that contrary to her expectations, Donald Trump's second term is implementing radical changes that enhance freedom and prosperity.",
        link: "https://nypost.com/2025/03/28/opinion/trump-is-making-us-freer-good-riddance-to-dei-statements-and-other-commentary/"
    },
    {
        title: "New poll shows where Trump stands 10 weeks into his second tour",
        text: "Where President Donald Trump stands in the polls 10 weeks into his second tour of duty in the White House, and how Americans rate the job.",
        link: "https://news.yahoo.com/poll-shows-where-trump-stands-160816243.html"
    },
    {
        title: "CBS News poll — Trump has positive approval amid 'energetic' start",
        text: "President Trump has started his term with net positive marks from Americans overall. Many say he's doing more than they expected.",
        link: "https://www.cbsnews.com/news/trump-approval-opinion-poll-2025-2-9/"
    },
    {
        title: "The Conservative Case for Trump",
        text: "A 2016 book arguing that American conservatives should vote for Donald Trump in the 2016 presidential election.",
        link: "https://en.wikipedia.org/wiki/The_Conservative_Case_for_Trump"
    },
    {
        title: "Trump's Gift Economy: How Strategic Offerings Shape His Administration",
        text: "Exploring how President Trump's interactions with foreign leaders and CEOs involve strategic gifts and offerings to gain favor and avoid economic penalties.",
        link: "https://www.axios.com/newsletters/axios-am-f25b6ea0-0b46-11f0-ad67-d90ef5112e83"
    },
    {
        title: "Trump's Tariffs: A Spectacle of Struggle and Control",
        text: "Analyzing President Trump's use of tariffs as instruments of pressure, rewarding loyalty and punishing defiance, even among allies.",
        link: "https://www.theguardian.com/commentisfree/2025/apr/01/the-guardian-view-on-donald-trumps-tariffs-a-spectacle-of-struggle-and-control"
    },
  {
        title: "Trump's Approval Rating: Tracking the Opinion Polls",
        text: "Monitoring how favorably Americans view President Trump and which issues are shaping their views.",
        link: "https://www.economist.com/interactive/trump-approval-tracker"
    },
    {
        title: "JD Vance to headline first RNC fundraiser as VP, a $100K per person NYC event, as he possibly eyes 2028 presidential run",
        text: "Vice President JD Vance will lead his first major fundraising event for the Republican National Committee in New York City, attracting influential donors and signaling potential ambitions for a 2028 presidential bid.",
        link: "https://nypost.com/2025/03/31/us-news/jd-vance-to-headline-his-first-rnc-fundraiser-in-nyc-monday/"
    },
    {
        title: "The pro-life pivot",
        text: "Vice President J.D. Vance has emerged as a champion of the unborn within the administration, advocating for pro-life policies and speaking at prominent conservative events.",
        link: "https://wng.org/opinions/the-pro-life-pivot-1743563305"
    },
    {
        title: "How J.D. Vance Became the Veepstakes Favorite",
        text: "An exploration of JD Vance's journey from author to Vice President, detailing how he garnered support from the MAGA elite and secured his position as Trump's running mate.",
        link: "https://thedispatch.com/article/how-j-d-vance-became-the-veepstakes-favorite/"
    },
    {
        title: "55 Things to Know About JD Vance, Trump's VP Pick",
        text: "A comprehensive list highlighting key facts about JD Vance, offering insights into his background, political evolution, and role as Vice President.",
        link: "https://www.politico.com/news/magazine/2024/07/15/jd-vance-55-things-trump-vp-00167882"
    },
    {
        title: "Inside the relationship of Vice President JD Vance and second lady Usha Vance",
        text: "An in-depth look at the personal and professional partnership between JD Vance and his wife Usha, shedding light on their journey and influence within the political landscape.",
        link: "https://www.businessinsider.com/jd-vance-wife-usha-vance-relationship-trump-politics-2024-7"
    },
    {
        title: "JD Vance Advocates for Greenland's Independence to Enhance Arctic Security",
        text: "Vice President JD Vance emphasizes the strategic importance of Greenland, urging its independence from Denmark to bolster security and economic ties with the U.S.",
        link: "https://nypost.com/2025/03/28/us-news/jd-vance-slams-denmark-urges-greenland-to-embrace-america-for-security-economy/"
    },
    {
        title: "Vance Criticizes Denmark's Governance in Greenland, Promotes U.S. Partnership",
        text: "During a visit to Greenland, Vice President JD Vance criticizes Denmark's underinvestment in the region and advocates for stronger U.S.-Greenland relations.",
        link: "https://www.thetimes.co.uk/article/jd-vance-wife-usha-visit-greenland-jjw530nft"
    },
    {
        title: "JD Vance's Economic Populism: A New Direction for the GOP",
        text: "An analysis of Vice President JD Vance's economic policies, highlighting his support for tariffs, antitrust measures, and a focus on American manufacturing.",
        link: "https://www.nytimes.com/2024/07/17/opinion/jd-vance-economic-populism.html"
    },
    {
        title: "Vance's Stance on Big Tech: Breaking Up Monopolies",
        text: "Vice President JD Vance calls for the breakup of major tech companies like Google and Meta, citing concerns over their influence on politics and information flow.",
        link: "https://www.foxbusiness.com/politics/ohio-senator-demands-google-breakup-amid-gemini-debacle-one-of-the-most-dangerous-companies-in-the-world"
    },
    {
        title: "JD Vance's Pro-Life Advocacy Gains Momentum",
        text: "Vice President JD Vance emerges as a leading pro-life advocate within the administration, championing policies aimed at protecting the unborn.",
        link: "https://wng.org/opinions/the-pro-life-pivot-1743563305"
    },
    {
        title: "Why the Conservative Movement Is Stronger Than Ever",
        text: "Examining the recent political victories and cultural shifts that have energized conservative values in America.",
        link: "https://www.nationalreview.com/2024/08/why-the-conservative-movement-is-stronger-than-ever/"
    },
    {
        title: "The Case for National Conservatism",
        text: "A look at how national conservatism is reshaping the Republican Party and redefining American politics.",
        link: "https://www.theamericanconservative.com/articles/the-case-for-national-conservatism/"
    },
    {
        title: "How Conservative Policies Are Revitalizing the U.S. Economy",
        text: "Lower taxes, deregulation, and energy independence are fueling economic growth under conservative leadership.",
        link: "https://www.heritage.org/economic-and-property-rights/commentary/how-conservative-policies-are-revitalizing-the-us-economy"
    },
    {
        title: "The Fight for Free Speech: Conservatives Push Back Against Big Tech Censorship",
        text: "Lawmakers and activists are taking a stand against Silicon Valley’s suppression of right-leaning voices.",
        link: "https://www.foxnews.com/politics/conservatives-fight-big-tech-censorship-new-bill"
    },
    {
        title: "The Importance of Family Values in Conservatism",
        text: "How traditional family structures and moral values remain at the heart of the conservative movement.",
        link: "https://www.dailywire.com/articles/the-importance-of-family-values-in-conservatism"
    },
    {
        title: "Conservative Fiscal Policies: How Lower Taxes Lead to Prosperity",
        text: "A deep dive into how conservative tax cuts and fiscal policies stimulate economic growth and job creation.",
        link: "https://www.nationalreview.com/2023/06/conservative-fiscal-policies-how-lower-taxes-lead-to-prosperity/"
    },
    {
        title: "The Conservative Push for Stronger Border Security",
        text: "Examining the benefits of stricter immigration policies and stronger border control to protect national security.",
        link: "https://www.foxnews.com/politics/the-conservative-push-for-stronger-border-security"
    },
    {
        title: "Why Deregulation Is Key to Economic Growth",
        text: "Exploring the conservative belief that reducing government regulations is essential for fostering innovation and economic progress.",
        link: "https://www.heritage.org/regulation/commentary/why-deregulation-is-key-economic-growth"
    },
    {
        title: "Conservative Family Policies: Strengthening America from the Ground Up",
        text: "How policies that promote traditional family values and support for parents are central to conservative thought.",
        link: "https://www.dailywire.com/news/conservative-family-policies-strengthening-america-from-the-ground-up"
    },
    {
        title: "Energy Independence: A Conservative Policy for National Security",
        text: "How conservative energy policies like increasing domestic production make America more secure and economically independent.",
        link: "https://www.theblaze.com/news/energy-independence-a-conservative-policy-for-national-security"
    }


    ]

function generatePropaganda() {
    return propaganda.sort(() => 0.5 - Math.random()).slice(0, 4);
}

searchButton.addEventListener('click', () => {
    resultsContainer.innerHTML = '';
    const propagandaItems = generatePropaganda();
    propagandaItems.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const resultContent = document.createElement('div');
        resultContent.classList.add('result-content');

        const title = document.createElement('h2');
        const titleLink = document.createElement('a');
        titleLink.href = item.link;
        titleLink.textContent = item.title;
        titleLink.target = "_blank";
        title.appendChild(titleLink);
        resultContent.appendChild(title);

        const text = document.createElement('p');
        text.textContent = item.text;
        resultContent.appendChild(text);

        resultItem.appendChild(resultContent);
        resultsContainer.appendChild(resultItem);
    });
});

searchBar.addEventListener("input", function () {
    let text = searchBar.value;
    let originalLength = text.length;
    let wordCount = 0;

    censoredWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = text.match(regex);
        if (matches) {
            wordCount += matches.length;
            censoredWordCount += matches.length;
            showShutdownError();
            return;
        }
        text = text.replace(regex, match => "█".repeat(match.length));
    });

    searchBar.value = text;
    updateBlurEffect();
});

function updateBlurEffect() {
    let blurAmount = Math.min(25, Math.max(0, censoredWordCount * 2));
    blurScreen.style.backdropFilter = `blur(${blurAmount}px)`;
}

function showShutdownError() {
    // Remove existing shutdown error if any
    let existingError = document.querySelector('.shutdown-error');
    if (existingError) {
        shutdownContainer.removeChild(existingError);
    }

    const errorBlock = document.createElement('div');
    errorBlock.classList.add('shutdown-error');
    errorBlock.innerHTML = `
        <div class="shutdown-title">System Shutdown</div>
        <div class="shutdown-content">
            <div class="shutdown-icon">❌</div>
            <div class="shutdown-message">
                The selected word is not recognized.
                <div class="error-code">Error HTTP 451</div>
            </div>
            <button class="back-button">Back</button>
        </div>
    `;
    
    shutdownContainer.appendChild(errorBlock);

    const backButton = errorBlock.querySelector('.back-button');
    backButton.addEventListener('click', () => {
        shutdownContainer.removeChild(errorBlock);
        searchBar.value = '';
    });
}
