(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            if (document.querySelector("body")) setTimeout((function() {
                document.querySelector("body").classList.add("_loaded");
            }), 200);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".score")) document.querySelectorAll(".score").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 2500);
        if (document.querySelector(".score")) document.querySelectorAll(".score").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    if (sessionStorage.getItem("resource")) {
        if (document.querySelector(".resource")) document.querySelectorAll(".resource").forEach((el => {
            el.textContent = sessionStorage.getItem("resource");
        }));
    } else {
        sessionStorage.setItem("resource", 50);
        if (document.querySelector(".resource")) document.querySelectorAll(".resource").forEach((el => {
            el.textContent = sessionStorage.getItem("resource");
        }));
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    function deleteMoney(count, block, storrName) {
        let money = +sessionStorage.getItem(storrName);
        sessionStorage.setItem(storrName, money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem(storrName)));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1900);
    }
    function noMoney(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1400);
    }
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function addMoney(count, block, delay, delay_off) {
        let money = Math.floor(+sessionStorage.getItem("money") + count);
        setTimeout((() => {
            sessionStorage.setItem("money", money);
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    function addResource(count, block, delay, delay_off) {
        let money = Math.floor(+sessionStorage.getItem("resource") + count);
        setTimeout((() => {
            sessionStorage.setItem("resource", money);
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("resource")));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    function saveArrStorrage(arr, name) {
        sessionStorage.setItem(name, JSON.stringify(arr));
    }
    function addNumberStorrage(name, number) {
        let arr = getArrStorrage(name);
        arr.push(number);
        saveArrStorrage(arr, name);
    }
    function getArrStorrage(name) {
        let arr = JSON.parse(sessionStorage.getItem(name));
        let numbers = arr;
        numbers.sort((function(a, b) {
            return a - b;
        }));
        return numbers;
    }
    let anim_items = document.querySelectorAll(".icon-anim img");
    function getRandomAnimate() {
        let number = getRandom(0, 3);
        let arr = [ "jump", "scale", "rotate" ];
        let random_item = getRandom(0, anim_items.length);
        anim_items.forEach((el => {
            if (el.classList.contains("_anim-icon-jump")) el.classList.remove("_anim-icon-jump"); else if (el.classList.contains("_anim-icon-scale")) el.classList.remove("_anim-icon-scale"); else if (el.classList.contains("_anim-icon-rotate")) el.classList.remove("_anim-icon-rotate");
        }));
        setTimeout((() => {
            anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
        }), 100);
    }
    if (document.querySelector(".icon-anim img")) setInterval((() => {
        getRandomAnimate();
    }), 2e4);
    const prices = {
        weapon_1: 500,
        weapon_2: 1e3,
        weapon_3: 1500,
        weapon_4: 2e3,
        weapon_5: 100,
        weapon_6: 250,
        weapon_7: 450
    };
    if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
        document.querySelector(".main").classList.add("_active");
        writeStartWeapons();
        drawPriceWeapons();
        chekBoughtWeapons();
        chekcCurrentWeapon();
    }
    function writeStartWeapons() {
        if (!sessionStorage.getItem("weapons")) {
            let weapons = [ "1" ];
            saveArrStorrage(weapons, "weapons");
        }
        if (!sessionStorage.getItem("current-weapon")) sessionStorage.setItem("current-weapon", 1);
    }
    function drawPriceWeapons() {
        document.querySelector('[data-item-price="1"]').textContent = prices.weapon_1;
        document.querySelector('[data-item-price="2"]').textContent = prices.weapon_2;
        document.querySelector('[data-item-price="3"]').textContent = prices.weapon_3;
        document.querySelector('[data-item-price="4"]').textContent = prices.weapon_4;
        document.querySelector('[data-item-price="5"]').textContent = prices.weapon_5;
        document.querySelector('[data-item-price="6"]').textContent = prices.weapon_6;
        document.querySelector('[data-item-price="7"]').textContent = prices.weapon_7;
        document.querySelector('[data-price="1"]').setAttribute("data-count", prices.weapon_1);
        document.querySelector('[data-price="2"]').setAttribute("data-count", prices.weapon_2);
        document.querySelector('[data-price="3"]').setAttribute("data-count", prices.weapon_3);
        document.querySelector('[data-price="4"]').setAttribute("data-count", prices.weapon_4);
        document.querySelector('[data-price="5"]').setAttribute("data-count", prices.weapon_5);
        document.querySelector('[data-price="6"]').setAttribute("data-count", prices.weapon_6);
        document.querySelector('[data-price="7"]').setAttribute("data-count", prices.weapon_7);
    }
    function buyWeapon(element) {
        let price = element.dataset.count;
        let number = element.dataset.price;
        if (number < 5) if (+sessionStorage.getItem("money") >= price) {
            setTimeout((() => {
                element.classList.add("_bought");
            }), 0);
            deleteMoney(price, ".score", "money");
            addNumberStorrage("weapons", number);
        } else noMoney(".score"); else if (number >= 5) if (+sessionStorage.getItem("resource") >= price) {
            setTimeout((() => {
                element.classList.add("_bought");
            }), 0);
            deleteMoney(price, ".resource", "resource");
            addNumberStorrage("weapons", number);
        } else noMoney(".resource");
    }
    function chekBoughtWeapons() {
        let boughtWeapons = getArrStorrage("weapons");
        let items = document.querySelectorAll(".box-store");
        boughtWeapons.forEach((weapon => {
            items.forEach((item => {
                if (item.dataset.price == weapon) {
                    setTimeout((() => {
                        item.classList.add("_bought");
                    }), 0);
                    document.querySelector(`[data-btn-price='${item.dataset.price}'] p`).textContent = "Select";
                }
            }));
        }));
    }
    function chekcCurrentWeapon() {
        let weapon = +sessionStorage.getItem("current-weapon");
        document.querySelectorAll(".box-store").forEach((item => {
            if (item.dataset.price == weapon) item.classList.add("_selected");
        }));
    }
    function removeSelectedPriceBox() {
        let items = document.querySelectorAll(".box-store");
        items.forEach((item => {
            if (item.classList.contains("_selected")) item.classList.remove("_selected");
        }));
    }
    const screenSize = {
        window_width: document.documentElement.clientWidth,
        window_height: document.documentElement.clientHeight
    };
    const config = {
        level: 1,
        start_coord_x: screenSize.window_width - 100,
        start_coord_y: screenSize.window_height - 180,
        currentPosition: [ screenSize.window_width - 100, screenSize.window_height - 50 ],
        weapon_speed: 5,
        weapon_width: 60,
        weapon_height: 100,
        win_money: 0,
        win_resource: 0,
        timerIdBonus: false,
        timerCl: false
    };
    const level_fruits = {
        level_1: 15,
        level_2: 20,
        level_3: 30,
        level_4: 50,
        destroyFruits: 0,
        count: 0,
        currentCount: 0
    };
    const offsets = {
        xLastOffset: 0,
        yLastOffset: 0,
        xCurrentOffset: 0,
        yCurrentOffset: 0,
        angle: 0
    };
    const words = [ "Great...!", "SUPERB...!", "Cool...!", "Fantastic...!", "Nice...!", "Excelent...!", "yeezy...!" ];
    if (document.querySelector(".game") && document.querySelector(".preloader").classList.contains("_hide")) {
        createWeaponGame();
        writeCountFruit();
        moveWeapon(config.start_coord_x, config.start_coord_y);
        moveTimerStartGame();
        swipeDetect();
    }
    function moveWeapon(x, y) {
        document.querySelector(".footer__weapon").style.left = `${x}px`;
        document.querySelector(".footer__weapon").style.top = `${y}px`;
    }
    function startGame() {
        generateFruits();
        config.timerCl = setInterval((() => {
            config.currentPosition = getWeaponPosition();
            checkCollision();
        }), 100);
    }
    function startTimer() {
        setTimeout((() => {
            document.querySelector(".timer").classList.add("_active");
            writeTimerCount();
        }), 500);
    }
    function writeTimerCount() {
        let count = 3;
        document.querySelector(".timer__count").textContent = count;
        let timer = setInterval((() => {
            if (0 == count) clearInterval(timer);
            count--;
            document.querySelector(".timer__count").textContent = count;
        }), 1e3);
    }
    function moveTimerStartGame() {
        startTimer();
        setTimeout((() => {
            startGame();
        }), 3500);
    }
    function writeRandomText() {
        let number = getRandom(0, 7);
        let textBlock = document.querySelector(".game__text");
        if (textBlock.classList.contains("_text-anim")) textBlock.classList.remove("_text-anim");
        textBlock.textContent = words[number];
        textBlock.classList.add("_text-anim");
        setTimeout((() => {
            textBlock.classList.remove("_text-anim");
        }), 750);
    }
    function writeCountFruit() {
        if (1 == config.level) level_fruits.count = level_fruits.level_1; else if (2 == config.level) level_fruits.count = level_fruits.level_2; else if (3 == config.level) level_fruits.count = level_fruits.level_3; else if (4 == config.level) level_fruits.count = level_fruits.level_4;
        level_fruits.currentCount = level_fruits.count;
    }
    function createWeaponGame() {
        let number = +sessionStorage.getItem("current-weapon");
        let weapon = document.createElement("img");
        setTimeout((() => {
            weapon.setAttribute("src", `img/weapons/weapon-${number}.svg`);
            weapon.setAttribute("alt", `Image`);
            document.querySelector(".footer__weapon").append(weapon);
        }), 0);
    }
    function createFruit() {
        let images_arr = [ "limon", "banan", "orange", "pear", "plum", "strawberry" ];
        let fruit_speed = 0;
        let rand_num = getRandom(0, 6);
        let rand_rotate = getRandom(0, 360);
        if (1 == config.level) fruit_speed = getRandom(20, 35); else if (2 == config.level) fruit_speed = getRandom(15, 30); else if (3 == config.level) fruit_speed = getRandom(10, 25); else if (4 == config.level) fruit_speed = getRandom(5, 20);
        let num_width = +screenSize.window_width - 50;
        let start_position = getRandom(20, num_width);
        let fruit = document.createElement("div");
        fruit.classList.add("field__fruit");
        fruit.setAttribute("value", images_arr[rand_num]);
        let image = document.createElement("img");
        image.setAttribute("src", `img/fruit/${images_arr[rand_num]}.png`);
        image.setAttribute("alt", `Image`);
        image.setAttribute("data-whole", "");
        image.style.transform = `rotate(${rand_rotate}deg)`;
        fruit.append(image);
        fruit.style.left = `${start_position}px`;
        document.querySelector(".field__body").append(fruit);
        let timerId = false;
        let top_position = -40;
        timerId = setInterval((() => {
            top_position += 5;
            fruit.style.top = `${top_position}px`;
            if (top_position > screenSize.window_height + 40) {
                clearInterval(timerId);
                fruit.remove();
            }
        }), fruit_speed);
    }
    function generateFruits() {
        let speed = 1200;
        let interval = false;
        interval = setInterval((() => {
            if (1 == config.level) speed = 1200; else if (2 == config.level) speed = 900; else if (3 == config.level) speed = 700; else if (4 == config.level) speed = 500;
        }), 100);
        setTimeout((() => {
            config.timerIdBonus = setInterval((() => {
                createFruit();
                level_fruits.currentCount--;
                if (level_fruits.currentCount <= 0) clearInterval(config.timerIdBonus);
            }), speed);
            let checkInt = setInterval((() => {
                let fruit = document.querySelectorAll(".field__fruit");
                if (fruit.length <= 0 && level_fruits.currentCount <= 0) {
                    clearInterval(checkInt);
                    showFinalyScreen();
                }
            }), 100);
        }), 200);
    }
    function showFinalyScreen() {
        let res = checkDestroyedFruit();
        if (res) document.querySelector(".win__sub-text").textContent = `victory`; else document.querySelector(".win__sub-text").textContent = `lose`;
        document.querySelector(".win__money").textContent = `+${config.win_money}`;
        document.querySelector(".win__resource").textContent = `+${config.win_resource}`;
        document.querySelector(".win").classList.add("_active");
        addMoney(config.win_money, ".score", 500, 1500);
        addResource(config.win_resource, ".resource", 500, 1500);
    }
    function getWeaponPosition() {
        let el = document.querySelector(".footer__weapon");
        let style = window.getComputedStyle(el);
        let coord_left = parseInt(style.left, 10);
        let coord_top = parseInt(style.top, 10);
        return [ coord_left, coord_top ];
    }
    function checkCollision() {
        let pos_x = config.currentPosition[0];
        let pos_y = config.currentPosition[1];
        document.querySelectorAll(".field__fruit").forEach((el => {
            let style = window.getComputedStyle(el);
            let coord_left = parseInt(style.left, 10);
            let coord_top = parseInt(style.top, 10);
            if (pos_x + config.weapon_width > coord_left && pos_y < coord_top + config.weapon_height && pos_x < coord_left + 90 && pos_y < coord_top + 90 && !el.classList.contains("_anim")) {
                checkBonusValue(el, coord_left, coord_top);
                el.classList.add("_anim");
                writeRandomText();
                ++level_fruits.destroyFruits;
                setTimeout((() => {
                    el.remove();
                }), 1500);
            } else if (coord_top >= screenSize.window_height - 80) el.remove();
        }));
    }
    function checkBonusValue(block, x, y) {
        if ("limon" == block.getAttribute("value")) config.win_money += 50; else if ("banan" == block.getAttribute("value")) config.win_resource += 10; else if ("orange" == block.getAttribute("value")) config.win_money += 70; else if ("pear" == block.getAttribute("value")) config.win_resource += 20; else if ("plum" == block.getAttribute("value")) config.win_money += 65; else if ("strawberry" == block.getAttribute("value")) config.win_money += 75;
        createDestroyedFruit(block, x, y, block.getAttribute("value"));
    }
    function createDestroyedFruit(block, x, y, fruit) {
        let pice_1 = document.createElement("img");
        let pice_2 = document.createElement("img");
        let blot = document.createElement("img");
        pice_1.setAttribute("src", `img/fruit/${fruit}-1.png`);
        pice_1.setAttribute("alt", `image`);
        pice_1.classList.add("field__piece-1");
        pice_1.style.left = `${x}px`;
        pice_1.style.top = `${y}px`;
        pice_2.setAttribute("src", `img/fruit/${fruit}-2.png`);
        pice_2.setAttribute("alt", `image`);
        pice_2.classList.add("field__piece-2");
        pice_2.style.left = `${x}px`;
        pice_2.style.top = `${y}px`;
        blot.setAttribute("src", `img/fruit/${fruit}-blot.png`);
        blot.setAttribute("alt", `image`);
        blot.classList.add("field__blot");
        blot.style.left = `${x}px`;
        blot.style.top = `${y}px`;
        block.querySelector("[data-whole]").classList.add("_whole");
        document.querySelector(".field__body").append(pice_1, pice_2, blot);
        pice_1.classList.add("_hide");
        pice_2.classList.add("_hide");
        blot.classList.add("_hide");
        setTimeout((() => {
            pice_1.remove();
            pice_2.remove();
            blot.remove();
        }), 5e3);
    }
    function checkDestroyedFruit() {
        let result = level_fruits.destroyFruits / level_fruits.count * 100;
        if (config.level <= 2 && result >= 50) return true; else if (config.level <= 2 && result < 50) return false;
        if (config.level > 2 && result >= 75) return true; else if (config.level > 2 && result < 75) return false;
    }
    function resetData() {
        document.querySelectorAll(".field__piece-1").forEach((item => item.remove()));
        document.querySelectorAll(".field__piece-2").forEach((item => item.remove()));
        document.querySelectorAll(".field__blot").forEach((item => item.remove()));
        let res = checkDestroyedFruit();
        if (config.level < 4 && res) ++config.level;
        document.querySelector(".timer").classList.remove("_active");
        writeCountFruit();
        config.win_money = 0;
        config.win_resource = 0;
        level_fruits.destroyFruits = 0;
    }
    function writeCurrentBg() {
        let wrapper = document.querySelector(".wrapper");
        if (wrapper.classList.contains("_bg-1")) wrapper.classList.remove("_bg-1"); else if (wrapper.classList.contains("_bg-2")) wrapper.classList.remove("_bg-2"); else if (wrapper.classList.contains("_bg-3")) wrapper.classList.remove("_bg-3");
        wrapper.classList.add(`_bg-${config.level}`);
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".preloader__button")) setTimeout((() => {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
                document.querySelector(".main").classList.add("_active");
                writeStartWeapons();
                drawPriceWeapons();
                chekBoughtWeapons();
                chekcCurrentWeapon();
            }
        }), 300);
        if (targetElement.closest('[data-button="store"]')) document.querySelector(".main__body").classList.add("_store");
        if (targetElement.closest('[data-button="to-main"]')) document.querySelector(".main__body").classList.remove("_store");
        if (targetElement.closest('[data-button="to-main"]')) document.querySelector(".main__body").classList.remove("_store");
        if (targetElement.closest(".box-store__button") && targetElement.closest(".store__box") && !targetElement.closest(".store__box").classList.contains("_bought")) {
            buyWeapon(targetElement.closest(".store__box"));
            chekBoughtWeapons();
        }
        if (targetElement.closest(".box-store__button") && targetElement.closest(".store__box") && targetElement.closest(".store__box").classList.contains("_bought")) {
            removeSelectedPriceBox();
            setTimeout((() => {
                targetElement.closest(".store__box").classList.add("_selected");
            }), 300);
            sessionStorage.setItem("current-weapon", targetElement.closest(".store__box").dataset.price);
        }
        if (targetElement.closest(".win__button")) {
            resetData();
            writeCurrentBg();
            document.querySelector(".win").classList.remove("_active");
            moveTimerStartGame();
        }
    }));
    function swipeDetect() {
        let startX, startY, dist, distX, distY, startTime, rads, touchsurface = document.querySelector(".game"), touchinprogress = false;
        touchsurface.addEventListener("touchstart", (function(e) {
            touchinprogress = true;
            let touchobj = e.changedTouches[0];
            dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = (new Date).getTime();
            moveWeapon(e.changedTouches[0].clientX - 60, e.changedTouches[0].clientY - 60);
            offsets.xLastOffset = e.changedTouches[0].clientX - 60;
            offsets.yLastOffset = e.changedTouches[0].clientY - 60;
        }), false);
        touchsurface.addEventListener("touchmove", (function(e) {
            var touchobj = e.changedTouches[0];
            distX = startX - touchobj.pageX;
            distY = startY - touchobj.pageY;
            rads = Math.atan2(distY, distX);
            var deg = rads * (180 / 3.14);
            moveWeapon(e.touches[0].clientX - 60, e.touches[0].clientY - 60);
            document.querySelector(".footer__weapon").style.transform = `rotate(${deg}deg)`;
        }), false);
        touchsurface.addEventListener("touchend", (function(e) {
            moveWeapon(screenSize.window_width - 100, screenSize.window_height - 150);
            document.querySelector(".footer__weapon").style.transform = `rotate(0deg)`;
        }), false);
    }
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
})();