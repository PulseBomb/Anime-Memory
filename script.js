$(function() {
    let BoxOpened = "";
    let ImgOpened = "";
    let Counter = 0;
    let ImgFound = 0;
    let isProcessing = false;
    let timerInterval;
    let seconds = 0;
    let totalCardsInLevel = 0;
    let gameStarted = false;
    let currentLevel = 1;
    let totalGameScore = 0;
    let hintsRemaining = 3;
    let playerID = localStorage.getItem('playerID') || generatePlayerID();
    let joinDate = localStorage.getItem('joinDate') || '';
    let highestLevel = 1;
    // Set 'en' as default language if not saved, otherwise load from localStorage
    let currentLanguage = localStorage.getItem('gameLanguage') || 'en';

    const Source = "#boxcard";

    // Image sources - (لا تغيير هنا)
    const ImgSource = [
        "https://i.postimg.cc/5YkbBZcC/76934667-photo-u2039837932.jpg",
        "https://i.postimg.cc/yk0CxJN9/1000519665-photo-u1954802929.jpg",
        "https://i.postimg.cc/fVK476mR/1001405067-photo-u-1184373143.jpg",
        "https://i.postimg.cc/k293bnVH/1001412409-photo-u6.jpg",
        "https://i.postimg.cc/QB4Rw16L/1001739287-photo-u2.jpg",
        "https://i.postimg.cc/4KNDWBQb/1001858916-photo-u-279040969.jpg",
        "https://i.postimg.cc/gXxfWj5x/1001918258-photo-u-1308200171.jpg",
        "https://i.postimg.cc/yg22YB4v/1002313791-photo-u1322999388.jpg",
        "https://i.postimg.cc/jnNmD9RK/1002528309-photo-u1.jpg",
        "https://i.postimg.cc/nMQ6SsB5/1002881445-photo-u897246783.jpg",
        "https://i.postimg.cc/56dDhxmt/1002881450-photo-u521125382.jpg",
        "https://i.postimg.cc/qzsW09mx/1002881461-photo-u1377241542.jpg",
        "https://i.postimg.cc/WdsC4XCL/1163696-photo-u66.jpg",
        "https://i.postimg.cc/K1QV3thK/1206645-photo-u357881036.jpg",
        "https://i.postimg.cc/SXsP6jmg/1223752-photo-u71.jpg",
        "https://i.postimg.cc/4KSSBZds/1374288-photo-u1327594506.jpg",
        "https://i.postimg.cc/hQF3RrTY/1397873-photo-u536564054.jpg",
        "https://i.postimg.cc/XGBDPhGF/16306147-photo-u19.jpg",
        "https://i.postimg.cc/y3Fp1ZT8/1644445-photo-u60.jpg",
        "https://i.postimg.cc/hhx5bkqR/1647832-photo-u745575487.jpg",
        "https://i.postimg.cc/nCJwd3Hj/1873529-photo-u20.jpg",
        "https://i.postimg.cc/87kXGsfT/1937749-photo-u49318972.jpg",
        "https://i.postimg.cc/qzxDW2Rm/1956789-photo-u1099110386.jpg",
        "https://i.postimg.cc/R3ygwRs0/1980623-photo-u-553481445-1.jpg",
        "https://i.postimg.cc/bSjLBvjc/2159322-photo-u26.jpg",
        "https://i.postimg.cc/xJmt5zh3/2313437-photo-u1640631108.jpg",
        "https://i.postimg.cc/R3NP38T8/2402691-photo-u1134048892.jpg",
        "https://i.postimg.cc/9zGLqyGW/2405212-photo-u1746168145.jpg",
        "https://i.postimg.cc/JGMP3tqj/2429629-photo-u1673954889.jpg",
        "https://i.postimg.cc/p5Ykbt29/33031863-photo-u73965888.jpg",
        "https://i.postimg.cc/Cz7JcYPX/3318746-photo-u-977402069.jpg",
        "https://i.postimg.cc/rDYjLjL9/63618250-photo-u33.jpg",
        "https://i.postimg.cc/jWphDj2w/63620125-photo-u1340560355.jpg",
        "https://i.postimg.cc/YvSRVVT9/67672037-photo-u239579391.jpg",
        "https://i.postimg.cc/zLbjDhzY/73586219-photo-u-938014010.jpg",
        "https://i.postimg.cc/dkGjrKZW/73586220-photo-u-1329109308.jpg",
        "https://i.postimg.cc/SYq7GtWm/73653167-photo-u38.jpg",
        "https://i.postimg.cc/nMt65F2h/76614330-photo-u-1238983925.jpg",
        "https://i.postimg.cc/m1w3pNwC/76616868-photo-u-2456485.jpg",
        "https://i.postimg.cc/Hj4f1qv4/76618336-photo-u1717650974.jpg",
        "https://i.postimg.cc/3d8z8tPM/76621566-photo-u119956165-1.jpg",
        "https://i.postimg.cc/jLMmLzbD/76624378-photo-u291239887.jpg",
        "https://i.postimg.cc/LJh7fn9N/76635037-photo-u40.jpg",
        "https://i.postimg.cc/Y4WsnZmF/76718382-photo-u1121955086.jpg",
        "https://i.postimg.cc/Vr9H1tgL/76718601-photo-u-183912306.jpg",
        "https://i.postimg.cc/ygCrwjFb/76879983-photo-u20.jpg",
        "https://i.postimg.cc/xN0pddpG/76946437-photo-u-138924364.jpg",
        "https://i.postimg.cc/NL4Pz1Ld/78559359-photo-u-1291600195.jpg",
        "https://i.postimg.cc/fJRgnJ9D/82589776-photo-u-1918250115.jpg",
        "https://i.postimg.cc/w7446gXJ/82594231-photo-u24.jpg",
        "https://i.postimg.cc/HrJZnRzN/85210030-photo-u-906544271.jpg",
        "https://i.postimg.cc/VJ37CgHk/85210031-photo-u-314465114.jpg",
        "https://i.postimg.cc/06DVdSLd/85211641-photo-u-393038609.jpg",
        "https://i.postimg.cc/mzSVKsZP/85212350-photo-u936623833.jpg",
        "https://i.postimg.cc/r0TQhmT6/85212559-photo-u-165954268.jpg",
        "https://i.postimg.cc/RJVGBDqX/85218236-photo-u22.jpg",
        "https://i.postimg.cc/K4Z0BRQB/87454763-photo-u-1004889094.jpg",
        "https://i.postimg.cc/zVQ7spNF/87454765-photo-u-1712664759.jpg",
        "https://i.postimg.cc/4myw2qD3/87454788-photo-u-111433772.jpg",
        "https://i.postimg.cc/BtMMg4wy/87466984-photo-u-151320722.jpg",
        "https://i.postimg.cc/ZWyH43Kt/87504570-photo-u-1242839027.jpg",
        "https://i.postimg.cc/SXFrssJX/gareki-photo-u1.jpg",
        "https://i.postimg.cc/ns41QJD3/hawks-u1.jpg",
        "https://i.postimg.cc/njnG4PKp/inosuke-hashibira-u-599576813.jpg",
        "https://i.postimg.cc/ft5jBf5X/katsuki-bakugo-u1.jpg",
        "https://i.postimg.cc/D8SdPsGJ/kyojuro-rengoku-u-1560871502.jpg",
        "https://i.postimg.cc/y3dh53rG/midnight-u15.jpg",
        "https://i.postimg.cc/jCdhCBdh/mitsuri-kanroji-u1550928713.jpg",
        "https://i.postimg.cc/DmjPG5S3/nejire-hado-u7.jpg",
        "https://i.postimg.cc/Mvg0PT0s/nezuko-kamado-u1665204042.jpg",
        "https://i.postimg.cc/gxRVfWNG/nobara-kugisaki-u-386634686.jpg",
        "https://i.postimg.cc/SXh64vvC/shinobu-kocho-u-84298184.jpg",
        "https://i.postimg.cc/DWPqwP9D/tanjiro-kamado-u1152650174.jpg",
        "https://i.postimg.cc/mzZ7zFRr/tatsumaki-u1899550438.jpg",
        "https://i.postimg.cc/62Hnd55f/toga-himiko-u7.jpg",
        "https://i.postimg.cc/ZvC3jtWt/tohru-photo-u1.jpg",
        "https://i.postimg.cc/hhj9Kxpy/toru-oikawa-u1170147282.jpg"
    ];

    const bgMusic = $("#bgMusic")[0];
    const flipSound = $("#flipSound")[0];
    const matchSound = $("#matchSound")[0];
    const nomatchSound = $("#nomatchSound")[0];
    const winSound = $("#winSound")[0];
    const hintSound = $("#hintSound")[0];

    // Ensure audio elements are loaded and set initial volume
    if (bgMusic) {
        bgMusic.volume = $("#bgMusicVolume").val();
        // Set a default volume if not already set, or if it's 0 to prevent silent start
        if (bgMusic.volume === 0) {
            bgMusic.volume = 0.5; // Default volume
            $("#bgMusicVolume").val(0.5);
        }
    }

    // Language translations object
    const translations = {
        en: {
            gameTitle: "Memory Game <span class='anime-text'>Epic Challenge</span>",
            welcomeMessage: "Welcome to the World of Memory!",
            startGameBtn: "Start Your Journey!",
            continueGameBtn: "Continue Game",
            resetGameBtn: "Reset Full Game",
            viewRankBtn: "View Hall of Fame",
            overallBestScore: "Overall Best Score: <span id='bestScoreDisplay'>0</span> Points",
            backgroundMusicLabel: "<i class='fas fa-music'></i> Background Music:",
            hallOfFameTitle: "<i class='fas fa-trophy'></i> Hall of Fame <i class='fas fa-trophy'></i>",
            loadingPlayers: "Loading top players...",
            backToMainMenuBtn: "<i class='fas fa-home'></i> Back to Main Menu",
            currentLevelLabel: "Level:",
            currentScoreLabel: "Score:",
            attemptsLabel: "Attempts:",
            timerLabel: "Time:",
            hintBtn: "<i class='fas fa-lightbulb'></i> Hint (<span id='hintsRemaining'>3</span>)",
            gameEndTitle: "Level Complete!",
            levelCompletionMessage: "Congratulations! You completed the level in <span id='finalAttempts'>0</span> attempts and <span id='finalTime'>0s</span>.",
            levelScoreLabel: "Level Score:",
            newRecordMsg: "🥳 New High Score!",
            totalGameScoreLabel: "Total Game Score:",
            nextLevelBtn: "<i class='fas fa-arrow-alt-circle-right'></i> Next Level",
            playAgainBtn: "<i class='fas fa-gamepad'></i> Play Again",
            congratulationsAllLevels: "Congratulations! You've mastered all levels!",
            noPlayersYet: "No players yet. Be the first to set a score!",
            errorLoadingRank: "Error loading Hall of Fame. Please try again later.",
            rankNumber: "#",
            player: "Player",
            level: "Level",
            score: "Score",
            you: "You",
            offlineWarning: "Offline or Firebase not available, attempting local load.",
            firebaseError: "Firebase Realtime Database is not available. Cannot load top players."
        },
        ar: {
            gameTitle: "لعبة الذاكرة <span class='anime-text'>تحدي الملحمي</span>",
            welcomeMessage: "مرحباً بك في عالم الذاكرة!",
            startGameBtn: "ابدأ رحلتك!",
            continueGameBtn: "متابعة اللعبة",
            resetGameBtn: "إعادة تعيين اللعبة بالكامل",
            viewRankBtn: "عرض لوحة الشرف",
            overallBestScore: "أفضل نتيجة إجمالية: <span id='bestScoreDisplay'>0</span> نقطة",
            backgroundMusicLabel: "<i class='fas fa-music'></i> موسيقى الخلفية:",
            hallOfFameTitle: "<i class='fas fa-trophy'></i> لوحة الشرف <i class='fas fa-trophy'></i>",
            loadingPlayers: "جاري تحميل أفضل اللاعبين...",
            backToMainMenuBtn: "<i class='fas fa-home'></i> العودة للقائمة الرئيسية",
            currentLevelLabel: "المستوى:",
            currentScoreLabel: "النقاط:",
            attemptsLabel: "المحاولات:",
            timerLabel: "الوقت:",
            hintBtn: "<i class='fas fa-lightbulb'></i> مساعدة (<span id='hintsRemaining'>3</span>)",
            gameEndTitle: "المستوى اكتمل!",
            levelCompletionMessage: "تهانينا! لقد أكملت المستوى في <span id='finalAttempts'>0</span> محاولة و <span id='finalTime'>0ث</span>.",
            levelScoreLabel: "نقاط المستوى:",
            newRecordMsg: "🥳 رقم قياسي جديد!",
            totalGameScoreLabel: "إجمالي نقاط اللعبة:",
            nextLevelBtn: "<i class='fas fa-arrow-alt-circle-right'></i> المستوى التالي",
            playAgainBtn: "<i class='fas fa-gamepad'></i> العب مرة أخرى",
            congratulationsAllLevels: "تهانينا! لقد أتقنت جميع المستويات!",
            noPlayersYet: "لا يوجد لاعبون حتى الآن. كن أول من يسجل نقاط!",
            errorLoadingRank: "حدث خطأ أثناء تحميل لوحة الشرف. يرجى المحاولة لاحقًا.",
            rankNumber: "#",
            player: "لاعب",
            level: "المستوى",
            score: "النقاط",
            you: "أنت",
            offlineWarning: "غير متصل أو Firebase غير متاح، جارٍ التحميل محليًا.",
            firebaseError: "قاعدة بيانات Firebase غير متاحة. لا يمكن تحميل أفضل اللاعبين."
        }
    };

    // Function to set the language
    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('gameLanguage', lang); // Save language preference

        // Set HTML lang attribute and dir
        $('html').attr('lang', lang);
        $('html').attr('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // Apply translations to elements with data-i18n attribute
        $('[data-i18n]').each(function() {
            const key = $(this).data('i18n');
            if (translations[lang] && translations[lang][key]) {
                $(this).html(translations[lang][key]); // Use .html() for keys with HTML tags
            }
        });

        // Update specific elements that need dynamic text (like timer)
        // قم بتحديث هذه الأسطر لضمان عرض القيم الصحيحة بعد تغيير اللغة
        $("#timer").html(`${seconds}${lang === 'ar' ? 'ث' : 's'}`);
        $("#finalTime").text(`${seconds}${lang === 'ar' ? 'ث' : 's'}`);
        // Ensure hint button text is updated correctly with the span inside
        $("#hintBtn").html(translations[lang].hintBtn.replace('<span id=\'hintsRemaining\'>3</span>', `<span id='hintsRemaining'>${hintsRemaining}</span>`));


        // Update language button active state
        $('#lang-en').toggleClass('active', lang === 'en');
        $('#lang-ar').toggleClass('active', lang === 'ar');

        // Reload top players to reflect language change in leader board
        loadTopPlayers();
    }

    // Initial language setup on page load
    setLanguage(currentLanguage);

    $("#bgMusicToggle").on("change", function() {
        if ($(this).is(":checked")) {
            bgMusic.play().catch(e => console.error("Error playing background music:", e));
        } else {
            bgMusic.pause();
        }
    });

    $("#bgMusicVolume").on("input", function() {
        if (bgMusic) {
            bgMusic.volume = $(this).val();
        }
    });

    function playSound(sound) {
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.error("Error playing sound:", e));
        }
    }

    function preloadImages(imageUrls) {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    preloadImages(ImgSource);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startTimer() {
        clearInterval(timerInterval);
        // تأكد من تهيئة الوقت المعروض قبل بدء المؤقت
        $("#timer").html(`${seconds}${currentLanguage === 'ar' ? 'ث' : 's'}`);
        timerInterval = setInterval(() => {
            seconds++;
            $("#timer").html(`${seconds}${currentLanguage === 'ar' ? 'ث' : 's'}`);
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function saveBestScore(score) {
        const bestScoreKey = "memoryGameOverallBestScore";
        const currentBest = parseInt(localStorage.getItem(bestScoreKey) || "0");
        if (score > currentBest) {
            localStorage.setItem(bestScoreKey, score);
            $("#newRecordMsg").removeClass("hidden");
        } else {
            $("#newRecordMsg").addClass("hidden");
        }
    }

    function getBestScore() {
        const bestScoreKey = "memoryGameOverallBestScore";
        const best = localStorage.getItem(bestScoreKey);
        return best ? best : "0";
    }

    function updateBestScoreDisplay() {
        $("#bestScoreDisplay").text(getBestScore());
    }

    function generatePlayerID() {
        const id = 'player_' + Math.random().toString(36).substring(2, 11);
        localStorage.setItem('playerID', id);
        return id;
    }

    function saveGameDataToFirebase() {
        if (typeof firebase === 'undefined' || !firebase.database) {
            console.warn("Firebase is not initialized or firebase.database is not available. Skipping Firebase save.");
            return;
        }

        if (!playerID) {
            console.error("Player ID is not set. Cannot save to Firebase.");
            return;
        }

        if (currentLevel > highestLevel) {
            highestLevel = currentLevel;
        }

        const gameData = {
            currentLevel: currentLevel,
            totalGameScore: totalGameScore,
            seconds: seconds,
            hintsRemaining: hintsRemaining,
            highestLevel: highestLevel,
            lastPlayed: firebase.database.ServerValue.TIMESTAMP,
            joinDate: joinDate
        };

        firebase.database().ref('players/' + playerID).set(gameData)
            .then(() => {
                console.log("Game data saved to Firebase successfully.");
                loadTopPlayers();
            })
            .catch((error) => {
                console.error("Error saving game data to Firebase:", error);
            });
    }

    function loadGameDataFromFirebase() {
        return new Promise((resolve, reject) => {
            if (typeof firebase === 'undefined' || !firebase.database) {
                console.warn("Firebase is not initialized or firebase.database is not available. Skipping Firebase load.");
                resolve(false);
                return;
            }
            if (!playerID) {
                console.warn("No player ID found. Cannot load from Firebase.");
                resolve(false);
                return;
            }

            firebase.database().ref('players/' + playerID).once('value')
                .then(snapshot => {
                    const data = snapshot.val();
                    if (data) {
                        currentLevel = data.currentLevel !== undefined ? data.currentLevel : 1;
                        totalGameScore = data.totalGameScore !== undefined ? data.totalGameScore : 0;
                        seconds = data.seconds !== undefined ? data.seconds : 0;
                        hintsRemaining = data.hintsRemaining !== undefined ? data.hintsRemaining : 3;
                        highestLevel = data.highestLevel !== undefined ? data.highestLevel : 1;
                        joinDate = data.joinDate || '';
                        console.log("Game data loaded from Firebase:", data);
                        resolve(true);
                    } else {
                        console.log("No existing data for player ID:", playerID);
                        resolve(false);
                    }
                })
                .catch(error => {
                    console.error("Error loading game data from Firebase:", error);
                    reject(error);
                });
        });
    }

    function saveGameDataToLocal() {
        if (currentLevel > highestLevel) {
            highestLevel = currentLevel;
        }
        const gameData = {
            currentLevel: currentLevel,
            totalGameScore: totalGameScore,
            seconds: seconds,
            hintsRemaining: hintsRemaining,
            playerID: playerID,
            joinDate: joinDate,
            highestLevel: highestLevel
        };
        try {
            localStorage.setItem('memoryGameData', JSON.stringify(gameData));
            console.log("Game data saved to localStorage.");
        } catch (e) {
            console.error("Failed to save game data to localStorage:", e);
        }
    }

    function loadGameDataFromLocal() {
        try {
            const savedGameData = localStorage.getItem('memoryGameData');
            if (savedGameData) {
                const parsedData = JSON.parse(savedGameData);
                currentLevel = parsedData.currentLevel !== undefined ? parsedData.currentLevel : 1;
                totalGameScore = parsedData.totalGameScore !== undefined ? parsedData.totalGameScore : 0;
                seconds = parsedData.seconds !== undefined ? parsedData.seconds : 0;
                hintsRemaining = parsedData.hintsRemaining !== undefined ? parsedData.hintsRemaining : 3;
                playerID = parsedData.playerID || generatePlayerID();
                joinDate = parsedData.joinDate || '';
                highestLevel = parsedData.highestLevel !== undefined ? parsedData.highestLevel : 1;
                console.log("Game data loaded from localStorage:", parsedData);
                return true;
            }
        } catch (e) {
            console.error("Failed to load game data from localStorage:", e);
            localStorage.removeItem('memoryGameData');
        }
        return false;
    }

    // Function to save game data to both local storage and Firebase
    function saveGameData() {
        saveGameDataToLocal();
        saveGameDataToFirebase();
    }

    // Function to load game data, preferring Firebase then local storage
    async function loadGameData() {
        let loaded = false;
        if (typeof firebase !== 'undefined' && firebase.database && navigator.onLine) {
            try {
                loaded = await loadGameDataFromFirebase();
                if (loaded) {
                    console.log("Loaded from Firebase.");
                } else {
                    console.log("Firebase found no data, attempting local load.");
                    loaded = loadGameDataFromLocal();
                }
            } catch (e) {
                console.warn(translations[currentLanguage].offlineWarning, e);
                loaded = loadGameDataFromLocal();
            }
        } else {
            console.warn(translations[currentLanguage].offlineWarning);
            loaded = loadGameDataFromLocal();
        }

        if (!loaded) {
            console.log("No saved data found, initializing new game state.");
            currentLevel = 1;
            totalGameScore = 0;
            seconds = 0;
            hintsRemaining = 3;
            highestLevel = 1;
            if (!playerID) {
                playerID = generatePlayerID();
            }
            if (!joinDate) {
                joinDate = new Date().toISOString();
                localStorage.setItem('joinDate', joinDate);
            }
            saveGameDataToFirebase();
            $("#startGameBtn").html(`${translations[currentLanguage].startGameBtn}`);
        } else {
            $("#startGameBtn").html(`${translations[currentLanguage].continueGameBtn}`);
        }
        return loaded;
    }

    function updateHintsDisplay() {
        $("#hintsRemaining").text(hintsRemaining);
        const hintFillWidth = (hintsRemaining / 3) * 100;
        $(".hint-fill").css("width", `${hintFillWidth}%`);
    }

    function useHint() {
        if (isProcessing || hintsRemaining <= 0 || ImgFound === totalCardsInLevel / 2) {
            return;
        }

        isProcessing = true;
        hintsRemaining--;
        updateHintsDisplay();
        playSound(hintSound);
        saveGameData();

        const unopenedCards = $(Source + " .card:not(.flipped):not(.matched)");
        if (unopenedCards.length < 2) {
            isProcessing = false;
            return;
        }

        let card1 = null;
        let card2 = null;
        let foundPair = false;

        for (let i = 0; i < unopenedCards.length; i++) {
            card1 = unopenedCards.eq(i);
            const img1Src = card1.find("img").attr("src");

            for (let j = i + 1; j < unopenedCards.length; j++) {
                card2 = unopenedCards.eq(j);
                const img2Src = card2.find("img").attr("src");

                if (img1Src === img2Src) {
                    foundPair = true;
                    break;
                }
            }
            if (foundPair) break;
        }

        if (foundPair) {
            card1.addClass("flipped");
            card1.find("img").css("opacity", "1");
            card2.addClass("flipped");
            card2.find("img").css("opacity", "1");

            setTimeout(() => {
                card1.removeClass("flipped");
                card1.find("img").css("opacity", "0");
                card2.removeClass("flipped");
                card2.find("img").css("opacity", "0");
                isProcessing = false;
            }, 2500);
        } else {
            isProcessing = false;
        }

        totalGameScore = Math.max(0, totalGameScore - 50);
        $("#currentScore").text(totalGameScore);
        saveGameData();
    }

    function calculateLevelScore() {
        let score = 1000;

        const perfectAttempts = totalCardsInLevel / 2;
        if (Counter <= perfectAttempts) {
            score += 200;
        } else if (Counter <= perfectAttempts + 2) {
            score += 100;
        } else {
            score -= (Counter - perfectAttempts) * 10;
        }

        if (seconds < 30) {
            score += 150;
        } else if (seconds < 60) {
            score += 50;
        } else {
            score -= (seconds - 60) * 5;
        }

        score -= (3 - hintsRemaining) * 50;

        totalGameScore += Math.max(0, score);
        saveGameData();

        return Math.max(0, score);
    }

    function generateCardsForLevel(numPairs) {
        $(Source).empty();
        const gameImages = [];

        const availableImages = shuffleArray([...ImgSource]);
        const imagesToUse = [];

        for (let i = 0; i < numPairs; i++) {
            if (i < availableImages.length) {
                imagesToUse.push(availableImages[i]);
            } else {
                imagesToUse.push(availableImages[i % availableImages.length]);
            }
        }

        imagesToUse.forEach(src => {
            gameImages.push(src);
            gameImages.push(src);
        });

        const shuffledGameImages = shuffleArray(gameImages);

        shuffledGameImages.forEach((src, index) => {
            const cardId = `card${index}`;
            const cardHtml = `<div class="card" id="${cardId}"><img src="${src}" alt="card image" class="card-img" style="opacity:0;" /></div>`;
            $(Source).append(cardHtml);
        });

        const totalCards = numPairs * 2;
        let gridCols = Math.ceil(Math.sqrt(totalCards));
        gridCols = Math.min(gridCols, 8);

        $('#boxcard').css('grid-template-columns', `repeat(${gridCols}, 1fr)`);

        if (totalCards > 30) {
            $('.card').css({ 'width': '65px', 'height': '65px' });
        } else {
            $('.card').css({ 'width': '80px', 'height': '80px' });
        }
    }

    function returnToMainMenu() {
        stopTimer();
        if (bgMusic) {
            bgMusic.pause();
        }

        $("#game-play-screen, #game-end-screen, #hall-of-fame-screen").removeClass("active");
        $("#game-start-screen").addClass("active");

        updateBestScoreDisplay();
        loadTopPlayers();
        saveGameData(); // CRUCIAL: Save the game data before leaving to main menu
        $("#startGameBtn").html(`${translations[currentLanguage].continueGameBtn}`); // Change button text to "Continue Game"
    }

    function resetGame() {
        stopTimer();
        BoxOpened = "";
        ImgOpened = "";
        Counter = 0;
        ImgFound = 0;
        isProcessing = false;
        gameStarted = false;
        currentLevel = 1;
        totalGameScore = 0;
        seconds = 0;
        hintsRemaining = 3;
        highestLevel = 1;

        $("#currentLevel").text(currentLevel);
        $("#currentScore").text(totalGameScore);
        $("#counter").text("0"); // تم التصحيح هنا
        $("#timer").html(`0${currentLanguage === 'ar' ? 'ث' : 's'}`); // تم التصحيح هنا
        updateHintsDisplay();
        $(Source).empty();

        $("#game-start-screen").addClass("active");
        $("#game-play-screen, #game-end-screen, #hall-of-fame-screen").removeClass("active");

        if (bgMusic) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
            $("#bgMusicToggle").prop("checked", true);
            $("#bgMusicVolume").val(0.5);
            bgMusic.volume = 0.5;
        }

        updateBestScoreDisplay();
        localStorage.removeItem('memoryGameData'); // Clear local saved game data completely
        saveGameDataToFirebase();
        loadTopPlayers();
        $("#startGameBtn").html(`${translations[currentLanguage].startGameBtn}`); // Reset button text to "Start Your Journey!"
        return false;
    }


    function startLevel() {
        const MAX_LEVEL = 70;
        const START_PAIRS = 3;
        const MAX_PAIRS_ALLOWED_BY_IMAGES = ImgSource.length;
        const TARGET_PAIRS_AT_MAX_LEVEL = Math.min(MAX_PAIRS_ALLOWED_BY_IMAGES, 40);

        let numPairsInLevel;

        if (MAX_LEVEL > 1) {
            const totalIncrease = TARGET_PAIRS_AT_MAX_LEVEL - START_PAIRS;
            const increasePerLevel = totalIncrease / (MAX_LEVEL - 1);
            numPairsInLevel = Math.floor(START_PAIRS + (currentLevel - 1) * increasePerLevel);
        } else {
            numPairsInLevel = START_PAIRS;
        }

        numPairsInLevel = Math.max(START_PAIRS, numPairsInLevel);
        numPairsInLevel = Math.min(TARGET_PAIRS_AT_MAX_LEVEL, numPairsInLevel);

        totalCardsInLevel = numPairsInLevel * 2;

        Counter = 0;
        ImgFound = 0;
        BoxOpened = "";
        ImgOpened = "";
        isProcessing = false;
        updateHintsDisplay();

        $("#currentLevel").text(currentLevel);
        $("#currentScore").text(totalGameScore);
        $("#counter").text(Counter); // **تم التصحيح هنا: استخدم Counter المتغير**
        $("#timer").html(`${seconds}${currentLanguage === 'ar' ? 'ث' : 's'}`); // **تم التصحيح هنا: استخدم seconds المتغير**

        generateCardsForLevel(numPairsInLevel);

        $(Source + " .card").removeClass("flipped matched").off("click").on("click", openCard);
        $(Source + " .card img").css("opacity", "0");

        $("#game-start-screen, #game-end-screen, #hall-of-fame-screen").removeClass("active");
        $("#game-play-screen").addClass("active");

        startTimer();
        gameStarted = true;
        saveGameData();
    }

    function openCard() {
        if (isProcessing || $(this).hasClass("flipped") || $(this).hasClass("matched") || !gameStarted) {
            return;
        }

        isProcessing = true;

        const currentCard = $(this);
        const imgElement = currentCard.find("img");
        const id = currentCard.attr("id");

        playSound(flipSound);

        currentCard.addClass("flipped");
        imgElement.css("opacity", "1");

        setTimeout(() => {
            if (BoxOpened === "") {
                BoxOpened = id;
                ImgOpened = imgElement.attr("src");
                isProcessing = false;
            } else {
                const CurrentOpenedSrc = imgElement.attr("src");
                Counter++;
                $("#counter").text(Counter); // تم التصحيح هنا
                // 
                if (ImgOpened !== CurrentOpenedSrc) {
                    playSound(nomatchSound);
                    setTimeout(function() {
                        currentCard.removeClass("flipped");
                        $("#" + BoxOpened).removeClass("flipped");
                        imgElement.css("opacity", "0");
                        $("#" + BoxOpened + " img").css("opacity", "0");
                        BoxOpened = "";
                        ImgOpened = "";
                        isProcessing = false;
                    }, 1200);
                } else {
                    playSound(matchSound);
                    currentCard.addClass("matched");
                    $("#" + BoxOpened).addClass("matched");
                    ImgFound++;
                    BoxOpened = "";
                    ImgOpened = "";
                    isProcessing = false;

                    if (ImgFound === totalCardsInLevel / 2) {
                        stopTimer();
                        playSound(winSound);

                        const levelScore = calculateLevelScore();
                        saveBestScore(totalGameScore);
                        saveGameData();

                        $("#finalAttempts").text(Counter);
                        $("#finalTime").text(`${seconds}${currentLanguage === 'ar' ? 'ث' : 's'}`);
                        $("#levelScore").text(levelScore);
                        $("#totalGameScore").text(totalGameScore);

                        $("#game-play-screen").removeClass("active");
                        $("#game-end-screen").addClass("active");
                        gameStarted = false;

                        const MAX_LEVEL = 70;
                        if (currentLevel >= MAX_LEVEL) {
                            $("#nextLevelBtn").hide();
                            $("#game-end-screen h2").html(translations[currentLanguage].congratulationsAllLevels);
                            localStorage.removeItem('memoryGameData');
                        } else {
                            $("#nextLevelBtn").show();
                        }
                    }
                }
            }
        }, 500);
    }

    function loadTopPlayers() {
        if (typeof firebase === 'undefined' || !firebase.database) {
            console.error(translations[currentLanguage].firebaseError);
            $("#topPlayersList").html(`<li>${translations[currentLanguage].firebaseError}</li>`);
            return;
        }

        $("#topPlayersList").html(`<li>${translations[currentLanguage].loadingPlayers}</li>`);

        firebase.database().ref('players')
            .orderByChild('totalGameScore')
            .limitToLast(10)
            .once('value', snapshot => {
                const playersData = [];
                snapshot.forEach(childSnapshot => {
                    const data = childSnapshot.val();
                    if (data.totalGameScore !== undefined && data.highestLevel !== undefined) {
                        playersData.push({
                            id: childSnapshot.key,
                            totalGameScore: data.totalGameScore,
                            highestLevel: data.highestLevel,
                            lastPlayed: data.lastPlayed
                        });
                    }
                });

                playersData.sort((a, b) => {
                    if (b.totalGameScore !== a.totalGameScore) {
                        return b.totalGameScore - a.totalGameScore;
                    }
                    return b.highestLevel - a.highestLevel;
                });

                const $topPlayersList = $("#topPlayersList");
                $topPlayersList.empty();

                if (playersData.length === 0) {
                    $topPlayersList.append(`<li>${translations[currentLanguage].noPlayersYet}</li>`);
                } else {
                    playersData.forEach((player, index) => {
                        const isCurrentPlayer = player.id === playerID;
                        const rankLabel = (index + 1);
                        const playerName = isCurrentPlayer ? translations[currentLanguage].you : `${translations[currentLanguage].player} ${rankLabel}`;
                        const listItem = $(`
                            <li ${isCurrentPlayer ? 'class="current-player-rank"' : ''}>
                                <span class="rank-number">${translations[currentLanguage].rankNumber}${rankLabel}</span>
                                <span class="player-name">${playerName}</span>
                                <span class="player-details">${translations[currentLanguage].level}: ${player.highestLevel}, ${translations[currentLanguage].score}: ${player.totalGameScore}</span>
                            </li>
                        `);
                        $topPlayersList.append(listItem);
                    });
                }
            })
            .catch(error => {
                console.error("Error loading top players from Firebase:", error);
                $("#topPlayersList").html(`<li>${translations[currentLanguage].errorLoadingRank}</li>`);
            });
    }

    // --- Event Listeners ---
    $("#startGameBtn").on("click", async function() {
        if (!joinDate) {
            joinDate = new Date().toISOString();
            localStorage.setItem('joinDate', joinDate);
        }
        await loadGameData(); // Ensure data is loaded/initialized before starting level
        startLevel();

        if ($("#bgMusicToggle").is(":checked")) {
            bgMusic.play().catch(e => console.error("Error playing background music on start:", e));
        }
    });

    $("#resetGameBtn").on("click", resetGame); // Full game reset

    $("#playAgainBtn").on("click", function() {
        resetGame();
    });

    $("#backToMenuBtn").on("click", returnToMainMenu); // Go back to main menu, preserving progress

    $("#nextLevelBtn").on("click", function() {
        currentLevel++;
        seconds = 0; // Reset timer for the new level
        hintsRemaining = 3; // Reset hints for the new level
        if (currentLevel > highestLevel) {
            highestLevel = currentLevel; // Update highest level achieved
        }
        startLevel(); // Start the next level
    });

    $("#hintBtn").on("click", useHint); // Use a hint

    // Event listener for the "View Rank" button
    $("#viewRankBtn").on("click", function() {
        stopTimer();
        if (bgMusic) {
            bgMusic.pause();
        }

        $(".game-screen").removeClass("active");
        $("#hall-of-fame-screen").addClass("active");

        loadTopPlayers();
    });

    // Event listener for the "Back to Main Menu" button on the Hall of Fame screen
    $("#backToStartFromRankBtn").on("click", function() {
        $("#hall-of-fame-screen").removeClass("active");
        $("#game-start-screen").addClass("active");
        updateBestScoreDisplay();
        saveGameData();
    });

    // Language switcher event listeners
    $("#lang-en").on("click", () => setLanguage('en'));
    $("#lang-ar").on("click", () => setLanguage('ar'));


    // Initial setup on load
    if (bgMusic) {
        bgMusic.volume = $("#bgMusicVolume").val();
    }

    updateBestScoreDisplay();

    loadGameData().then(loaded => {
        if (loaded) {
            $("#game-start-screen").addClass("active");
            $("#game-play-screen, #game-end-screen, #hall-of-fame-screen").removeClass("active");

            $("#currentLevel").text(currentLevel);
            $("#currentScore").text(totalGameScore);
            updateHintsDisplay();
            // This is the important part: set the button text based on whether there's saved data
            $("#startGameBtn").html(`${translations[currentLanguage].continueGameBtn}`);
        } else {
            $("#game-start-screen").addClass("active");
            $("#game-play-screen, #game-end-screen, #hall-of-fame-screen").removeClass("active");
            $("#startGameBtn").html(`${translations[currentLanguage].startGameBtn}`);
        }
        loadTopPlayers();
        setLanguage(currentLanguage); // Apply initial language and update UI elements
    }).catch(error => {
        console.error("Failed to load game data initially:", error);
        $("#game-start-screen").addClass("active");
        $("#game-play-screen, #game-end-screen, #hall-of-fame-screen").removeClass("active");
        loadTopPlayers();
        setLanguage(currentLanguage); // Apply language even on error
    });
});
