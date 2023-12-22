/* 
    THIS IS NOT THE CODE YOU ARE LOOKING FOR!

    This file contains the provided functions and tests for this SkillBuilder.  The instructions and coding environment for this assignment are in the file script.js.

    DO NOT EDIT THIS FILE!
*/


/* Variables storing an audio objects to make the various sounds.  See how it's used for the 'click' sound in the provided function below.  */
let clickAudio = new Audio('audio/click.wav');
let matchAudio = new Audio('audio/match.wav');
let winAudio = new Audio('audio/win.wav')

/*
OVERVIEW:
Attaches an mouseclick listener to a card (i.e. onclick), flips the card when clicked, and calls the function 'onCardFlipped' after the flip is complete.

INPUT/OUPUT
The 'cardObject' parameter is a custom card object we created in the 'createCards' function.

This function will make the card element associated with 'cardObject' clickable and call onCardFlipped with that cardObject after the flip is complete.
*/
function flipCardWhenClicked(cardObject) {
  // Adds an "onclick" attribute/listener to the element that will call the function below.
  cardObject.element.onclick = function() {
    // THE CODE BELOW RUNS IN RESPONSE TO A CLICK.

    // Card is already flipped, return.
    if (cardObject.element.classList.contains("flipped")) {
      return;
    }
  
    // Play the "click" sound.
    clickAudio.play();

    // Add the flipped class immediately after a card is clicked.
    cardObject.element.classList.add("flipped");

    // Wait 500 milliseconds (1/2 of a second) for the flip transition to complete and then call onCardFlipped.
    setTimeout(function() {
      // THE CODE BELOW RUNS AFTER a 500ms delay.
      onCardFlipped(cardObject);
    }, 500);
  };
}



function  createNewCardTest() {
  const TEST_NAME = "createNewCardTest";
  
  // Check step 1 heuristics.
  let variableAndCreateElementPresentSpec = 
    functionSpec(createNewCard)
      .contains("let")
        .or("var")
        .or("const")
      .andThen("createElement");
  let passedStep1Heuristics = 
    checkFunctionSpec(variableAndCreateElementPresentSpec);
  let step1Hint = constructHintMessage(1, `Try starting by calling document.createElement — this will create and return a new DOM element (the card) that you can store in a variable.`, RESOURCES.createElement);
  
  // Check step 2 heuristics.
  let classListAddPresentSpec = 
    functionSpec(createNewCard)
      .contains("classList.add")
      .andThen("card")
  let classNameEqualsPresentSpec = 
    functionSpec(appendNewCard)
      .contains("className")
        .andThen("card");
  let passedStep2Heuristics = 
    checkFunctionSpec(classListAddPresentSpec) || 
    checkFunctionSpec(classNameEqualsPresentSpec);
  let step2Hint = constructHintMessage(2, `Remember that you can access and manipulate an element's classes using cardElement.classList.  Try checking out the docs for classList.add().`, RESOURCES.classListAdd);

  let usesInnerHtml = 
    functionSpec(createNewCard)
      .contains(".innerHTML");
  let passedStep3Heuristics = 
    checkFunctionSpec(usesInnerHtml);
  let step3Hint = constructHintMessage(3, `Try using innerHTML on your card element to define the two new divs with JavaScript template literals (using the backticks). You can define the divs with the same HTML syntax you use in your index.html!`, RESOURCES.innerHTML);
  
  // Run user function.
  let card;
  let exception = callUserCode(() => {
    card = createNewCard();
  });

  if (card == undefined) {
    if (!passedStep1Heuristics) {
      console.log(constructLateErrorMessage(TEST_NAME, 4));
      console.log(step1Hint);
    } else if (!passedStep2Heuristics) {
      console.log(constructLateErrorMessage(TEST_NAME, 4));
      console.log(step2Hint);
    } else if (!passedStep3Heuristics) {
      console.log(constructLateErrorMessage(TEST_NAME, 4));
      console.log(step3Hint);
    } else {
      console.log(constructErrorMessage(TEST_NAME, 4, `We don't see a return value. Remember to return cardElement!`));
    }
    return false;
  }

  if (!(card instanceof Element)) {
    console.log(constructErrorMessage(TEST_NAME, 4, `This function should return a DOM element, but that's not what we got.`));
    return false;
  }

  if (card.tagName.toLowerCase() != "div") {
    console.log(constructErrorMessage(TEST_NAME, 1, `The card should be a 'div' element but we got something else.  Remember to use a 'div'!`));
    console.log("\nHere's what the HTML looks like:\n" +
      serialize(card) + "\n");
    console.log(step1Hint);
  }

  if (!card.classList.contains("card")) {
    console.log(constructErrorMessage(TEST_NAME, 2, `The card div should have a class named 'card'.`));
    console.log("\nHere's what the HTML looks like:\n" +
      serialize(card) + "\n");
    console.log(step2Hint);
  }

  if (card.children.length !== 2) {
    console.log(constructErrorMessage(TEST_NAME, 3, `You should be adding exactly 2 children to the innerHTML of the card, but we see ${card.children.length}.`));
    console.log("\nHere's what the HTML looks like:\n" +
      serialize(card) + "\n");
    console.log(step3Hint);
    return false;
  }

  let cardDown = card.children[0];
  let cardUp = card.children[1];

  if (!cardDown.classList.contains("card-down")) {
    console.log(constructErrorMessage(TEST_NAME, 3, `The first child of the card should be a div with the class 'card-down'.`));
    console.log("\nHere's what the HTML looks like:\n" +
      serialize(card) + "\n");
    console.log(step3Hint);
    return false;
  }

  if (!cardUp.classList.contains("card-up")) {
    console.log(constructErrorMessage(TEST_NAME, 3, `The second child of the card should be a div with the class 'card-up'.`));
    console.log("\nHere's what the HTML looks like:\n" +
      serialize(card) + "\n");
    console.log(step3Hint);
    return false;
  }

  outputPassMessage(TEST_NAME);
  return true;
}

function appendNewCardTest() {
  const TEST_NAME = "appendNewCardTest";
  
  // Check step 1 heuristics.
  let variableAndCreateCardPresentSpec = 
    functionSpec(appendNewCard)
      .contains("let")
        .or("var")
        .or("const")
      .andThen("createNewCard");
  let passedStep1Heuristics = 
    checkFunctionSpec(variableAndCreateCardPresentSpec);
  let step1Hint = constructHintMessage(1, `You should be starting by calling 'createNewCard' and storing the result in a variable.`, RESOURCES.createElement);
  
  let usesAppendChild = 
    functionSpec(appendNewCard)
      .contains(".appendChild");
  let passedStep2Heuristics = 
    checkFunctionSpec(usesAppendChild);
  let step2Hint = constructHintMessage(2, `Try using the appendChild method on the parentElement and pass in your new card element as the argument.`, RESOURCES.appendChild);
  
  // Run user function.
  let returnValue;
  let parent = document.createElement("div");
  parent.setAttribute("id", "card-container");
  let exception = callUserCode(() => {
    returnValue = appendNewCard(parent);
  });

  if (parent.children.length !== 1) {
    if (!passedStep1Heuristics) {
      console.log(constructLateErrorMessage(TEST_NAME, 4));
      console.log(step1Hint);
    } else if (!passedStep2Heuristics) {
      console.log(constructLateErrorMessage(TEST_NAME, 4));
      console.log(step2Hint);
    } else {
      console.log(constructErrorMessage(TEST_NAME, 4, `The 'parentElement' does not have any children.  Remember to append the new card to 'parentElement'.`));
      console.log(step4Hint)
      console.log("\nHere's what the HTML looks like:\n\n" + serialize(parent) + "\n\n");
    }
    return false;
  }
  
  let card = parent.children[0];
  if (!card.classList.contains("card")) {
    console.log(constructErrorMessage(TEST_NAME, 2, `The child of parentElement should be a card. Remember to add the 'card' class to this element.`));
    console.log(step2Hint);
    console.log("\nHere's what the HTML looks like:\n\n" + serialize(parent) + "\n\n");
  }

  if (returnValue !== card) {
    console.log(constructErrorMessage(TEST_NAME, 3, `The return value of this function should be the card but that's not what we got.`));
    console.log(constructHintMessage(3, "Remember to return the cardElement you just made!"));
    return false;
  }

  if (exception != undefined) {
    console.error(constructErrorMessage(TEST_NAME, "?", `We encountered an error running your function`));
    return false;
  }

  outputPassMessage(TEST_NAME);
  return true;
}

function shuffleCardImageClassesTest() {
  const TEST_NAME = "shuffleCardImageClassesTest";

  // Check step 1 heuristics.
  let variableDeclarationAndClassesPresentSpec = 
    functionSpec(shuffleCardImageClasses)
      .contains("let")
        .or("var")
        .or("const")
      .andThen("[")
      .andThen("image-1")
      .andThen("image-1")
      .andThen("image-2")
      .andThen("image-2")
      .andThen("image-3")
      .andThen("image-3")
      .andThen("image-4")
      .andThen("image-4")
      .andThen("image-5")
      .andThen("image-5")
      .andThen("image-6")
      .andThen("image-6")
      .andThen("]");
  let passedStep1Heuristics = 
    checkFunctionSpec(variableDeclarationAndClassesPresentSpec);
  let step1Hint = constructHintMessage(1, `Try starting by declaring a variable that holds an array of strings in the form ["image-1", "image-1", "image-2", "image-2", "image-3", ... , "image-6", "image-6"]`, RESOURCES.arrays);

  let step2HintLoadUnderscore = constructHintMessage(2, `The CDN for underscore must be included in your script tags above all other scripts, like this: ${COLOR_CODE.cyan}<script src="https://cdn.jsdelivr.net/npm/underscore@1.13.1/underscore-umd-min.js"></script>${COLOR_CODE.reset}`)
 
  // Check step 3 heuristics.
  let underScoreAndShuffleUsed = 
    functionSpec(shuffleCardImageClasses)
      .contains("_")
      .andThen(".shuffle");
  let passedStep3Heuristics = 
    checkFunctionSpec(underScoreAndShuffleUsed);
  let step3Hint = constructHintMessage(3, `We did not find use of _.shuffle. Your return needs to use _.shuffle using your image classes as the argument.`, RESOURCES.underscore);

  // Check for underscore availability and exceptions.
  let exception = callUserCode(() => {
    shuffleCardImageClasses();
  });

  if (exception != undefined) {
    if (!passedStep1Heuristics) {
      console.log(constructLateErrorMessage(TEST_NAME, 2));
      console.log(step1Hint);
    } else if (exception.toString().includes('_ is not defined')) {
      console.log(constructErrorMessage(TEST_NAME, 2, "JavaScript does not understand the _ (underscore) in your code, meaning that the underscore.js library was not properly loaded."));
      console.log(step2HintLoadUnderscore);
    } else {
      console.error(constructErrorMessage(TEST_NAME, "?", `We encountered an error running your function`));
      return false;
    }

    return false;
  }

  let imageArray1; 
  let imageArray2;
  let imageArray3; 
  let imageArray4;

  exception = callUserCode(() => {
    imageArray1 = shuffleCardImageClasses();
    imageArray2 = shuffleCardImageClasses();
    imageArray3 = shuffleCardImageClasses();
    imageArray4 = shuffleCardImageClasses();
  });

  if (exception != undefined) {
    console.error(constructErrorMessage(TEST_NAME, "?", `We encountered an error running your function`));
    return false;
  }

  // Check for objects.
  if (typeof imageArray1 != "object" || 
      typeof imageArray2 != "object" || 
      typeof imageArray3 != "object" || 
      typeof imageArray4 != "object") {
    if (!passedStep1Heuristics) {
      console.log(constructLateErrorMessage(TEST_NAME, 3));
      console.log(step1Hint);
    } else if (!passedStep3Heuristics) {
      console.log(constructLateErrorMessage(TEST_NAME, 3));
      console.log(step3Hint);
    } else {
      console.log(constructErrorMessage(TEST_NAME, 3, "Your function should be returning an array but it's not."))
      console.log(constructHintMessage(3, "Remember to write a return statement!"));
    }

    return false;
  }

  let allStrings = imageArray1.every(
    el => (typeof el === "string"));
  if (!allStrings) {
    console.error(constructErrorMessage(TEST_NAME, 1, 'Your function should return an array of all strings but array elements were not all strings.'));
    console.log(constructHintMessage(3, "Remeber to wrap your strings inside double or single quotes."));    
    return false;
  }

  let allGoodClassNames = imageArray1.every(
    el => {
      return el.startsWith('image-') && 
             el.length == 7 && 
             (el[6] >= 1 && el[6] <= 6);
    });
  if (!allGoodClassNames) {
      console.log(constructErrorMessage(TEST_NAME, 1, "It looks like one or more of the string elements in your array have been misnamed. Please stick to 2 sets of 'image-1' through 'image-6', in string format."));
      return false;
  }

  countHash = {};
  for (let i = 1; i <= 6; i++) {
    countHash[String(i)] = 0;
  }
  imageArray1.forEach(el => {
    countHash[el[6]]++;
  });
  for (let i = 1; i <= 6; i++) {
    if (countHash[String(i)] != 2) {
      console.log(constructErrorMessage(TEST_NAME, 1, "You need to have exactly 2 of each image class (image-1 to image-6) in your array.  It looks like that's not the case."));
      return false;
    }
  }

  let allSame = true;
  for (let i = 0; i < imageArray1.length; i++) { 
    if (imageArray1[i] != imageArray2[i] || 
        imageArray1[i] != imageArray3[i] || 
        imageArray1[i] != imageArray4[i]) {
      allSame = false;
      break;
    }
  }
  if (allSame) {
    console.log(constructErrorMessage(TEST_NAME, 2, ` Function should return a random array of class names but 4 comparison calls returned the same array.`));
    console.log(constructHintMessage(2, `Make sure to shuffle by calling _.shuffle using your array as the argument!`, RESOURCES.underscore));
    return false;
  }

  outputPassMessage(TEST_NAME);
  return true;
}

function createCardsTest() {
  const TEST_NAME = "createCardsTest";

  // Check step 1 heuristics.
  let variableAndEmptyArrayPresentSpec = 
    functionSpec(createCards)
      .contains("let")
        .or("var")
        .or("const")
      .andThen("[]");
  let passedStep1Heuristics = 
    checkFunctionSpec(variableAndEmptyArrayPresentSpec);
  let step1Hint = constructHintMessage(1, `Try starting by creating a variable that holds an empty array: [].`, RESOURCES.arrays);

  // Check step 2 heuristics.
  let forLoopPresentSpec = 
    functionSpec(createCards)
      .contains("for")
      .andThen("12")
      .andThen("++"); 
  let passedStep2Heuristics = 
    checkFunctionSpec(forLoopPresentSpec);
  let step2Hint = constructHintMessage(2, `Try checking that you have a for loop iterating 12 times.`, RESOURCES.forLoops);

  // Check step 2a heuristics.
  let variableappendNewCardPresentSpec = 
    functionSpec(createCards)
      .contains("let")
        .or("var")
        .or("const")
      .andThen("appendNewCard");
  let passedStep2aHeuristics = 
    checkFunctionSpec(variableappendNewCardPresentSpec);
  let step2aHint = constructHintMessage("2a", `Try declaring a variable that stores the result of calling appendNewCard with the argument 'parentElement'.`);
  
  // Check step 2b heuristics.
  let classListAddPresentSpec = 
    functionSpec(createCards)
      .contains("classList.add")
      .andThen("shuffledImageClasses");
  let passedStep2bHeuristics = 
    checkFunctionSpec(classListAddPresentSpec);
  let step2bHint = constructHintMessage("2b", `Try calling classList.add on your new card from step 2a.`, RESOURCES.classListAdd);

  // Check step 2c index heuristics.
  let cardObjectspec = 
    functionSpec(createCards)
      .contains("index")
      .andThen("element")
      .andThen("imageClass")
  let passedStep2cHeuristics = 
      checkFunctionSpec(cardObjectspec);
  let step2cHint = constructHintMessage("2c", `Try checking that your object has 3 "key-value" pairs. Something like:
    {
      index: i, <-- the key is "index", value is loop iteration
      element: newElement,
      imageClass: shuffledImageClasses[i],
    }`, RESOURCES.objects);


  let imageClasses = [
    "image-1", "image-1", 
    "image-2", "image-2",
    "image-3", "image-3",
    "image-4", "image-4",
    "image-5", "image-5",
    "image-6", "image-6",
  ];
  let parent = document.createElement("div");
  let exception = callUserCode(()=> {
    return cards = createCards(parent, imageClasses);
  });

  if (parent.children.length != 12) {
    if (!passedStep1Heuristics) {
      console.log(constructLateErrorMessage(TEST_NAME, 4));
      console.log(step1Hint);
      } else if (!passedStep2Heuristics) {
        console.log(constructLateErrorMessage(TEST_NAME, 4));
        console.log(step2Hint);
      } else if (!passedStep2aHeuristics) {
        console.log(constructLateErrorMessage(TEST_NAME, 4));
        console.log(step2aHint);
      }  
      else if (!passedStep2bHeuristics) {
        console.log(constructLateErrorMessage(TEST_NAME, 4));
        console.log(step2bHint);
      }  
      else if (!passedStep2cHeuristics) {
        console.log(constructLateErrorMessage(TEST_NAME, 4));
        console.log(step2cHint);
      } else {    
        console.error(constructErrorMessage(`Should create 12 card objects as children but got ${parent.children.length}. Make sure you are adding the right number of cards to the card-grid-container!`));
    }
    return false;
  }

  if (parent.children[0].classList[1] == undefined) {
    console.log(constructErrorMessage(TEST_NAME, 2, `The classList for your new element should include an image class. We tested for classes and got: ${parent.children[0].classList}`));
    console.log(step2bHint);
    return false
  }


  if (!parent.children[0].classList[1].includes("image")) {
    console.log(constructErrorMessage(TEST_NAME, 2, `The classList for your new element should include the "card" class and an image class. Your we tested for classes and got: ${parent.children[0].classList}`));
    console.log(step2bHint);
    return false
  }
 
  if (typeof(cards) !== "object" || cards.length == "undefined") {        
    console.error(constructErrorMessage(TEST_NAME, 3, `Should return an array of objects but returned ${typeof(cards)}.`));

    console.log(constructHintMessage(3, `Remember to return the card object array you just made!  The return value of this function should be the array of 12 card objects but that's not what we got.` ));
    return false;
      
  }

  if (cards.length !== 12) {
    if (!passedStep2cHeuristics) {
      console.log(constructLateErrorMessage(TEST_NAME, 4));
      console.log(step2cHint);
    } else {
        console.error(constructErrorMessage(TEST_NAME, 3, `Should return 12 card objects as children but got ${parent.children.length}. Make sure you are pushing 12 cards onto your cards array!`));
    }
    return false;
  }

  let badObject = null;
  cards.forEach((card) => {
    if (!card.hasOwnProperty("index") || !card.hasOwnProperty("element") || !card.hasOwnProperty("imageClass")) {
      badObject = card;
      return false;
    }
  });

  if (badObject !== null) {
    console.error(constructErrorMessage(TEST_NAME, "2c", `Card objects should each have index, element, and imageClass properties but got...`));
    console.log(badObject);
    console.log(step2cHint);
    return false;
  }

  outputPassMessage(TEST_NAME);
  return true;
}

function doCardsMatchTest() {
  const TEST_NAME = "doCardsMatchTest";
  
  let cardA = {
    index: 5,
    element: document.createElement("div"),
    imageClass: "image-2"
  };
  let cardB = {
    index: 7,
    element: document.createElement("div"),
    imageClass: "image-2"
  }
  let cardC = {
    index: 9,
    element: document.createElement("div"),
    imageClass: "image-5"
  }

  let step1Hint = constructHintMessage(1, `Try comparing the imageClass property on each card element. You can do this by returning the result of a camparison between two parameters (e.g. parm1.property == param2.property)."`, RESOURCES.equality);

  if (!doCardsMatch(cardA, cardB)) {
    console.log(constructErrorMessage(TEST_NAME, 1, `We supplied cards with the same imageClass for cardObject1 and cardObject2 but the function returned 'false'.`));
    console.log(step1Hint)
    return false;
  }

  if (doCardsMatch(cardA, cardC)) {
    console.log(constructErrorMessage(TEST_NAME, 1, `We supplied cards with different a imageClass for cardObject1 and cardObject2 but the function returned 'true'.`));
    console.log(step1Hint)
    return false;
  }

  outputPassMessage(TEST_NAME);
  return true;
}

function incrementCounterTest() {
  const TEST_NAME = "incrementCounterTest";

  let counterNameAtZero = 
    functionSpec(incrementCounter)
      .contains("if")
      .andThen("counters")
      .andThen("undefined");
  let passedStep1Heuristics = 
    checkFunctionSpec(counterNameAtZero);

  let step1Hint = constructHintMessage(1, `Try writing an 'if statement' that compares counters[counterName] and undefined`, RESOURCES._undefined);
  
  let counterNameIncrement = 
    functionSpec(incrementCounter)
      .contains("counters[counterName]++;")
      .or("counters[counterName] += 1")
      .or("counters[counterName] = counters[counterName] + 1")
  let passedStep2Heuristics = 
    checkFunctionSpec(counterNameIncrement);

  let step2Hint = constructHintMessage(2, `Make sure you're adding 1 to the counters[counterName]. The simplest way to achieve that is with the JavaScript increment operator`, RESOURCES.increment);

  let innerHtmlSet = 
    functionSpec(incrementCounter)
      .contains(".innerHTML")
      .andThen("counters")
      .andThen("[counterName]")
  let passedStep3Heuristics = 
    checkFunctionSpec(innerHtmlSet);

  let step3Hint = constructHintMessage(3, `Try using innerHTML on parentElement and set it to the new counter value.`, RESOURCES.innerHTML);

  // Clear global counters.
  try { 
    counters = {};
  } catch(err) {}
  
  let parentElement = document.createElement("div");
  let string1;
  let value1;
  let string2;
  let value2;

  let exception = callUserCode(() => {
    incrementCounter("counter1", parentElement);
    string1 = parentElement.innerHTML;
    value1 = Number(parentElement.innerHTML);

    incrementCounter("counter1", parentElement);
    string2 = parentElement.innerHTML;
    value2 = Number(parentElement.innerHTML);
  });
 
  if (value1 !== 1) {
    if (!passedStep1Heuristics) {
      console.log(constructLateErrorMessage(TEST_NAME, 3))
      console.log(step1Hint);
    } else if (!passedStep2Heuristics) {
      console.log(constructLateErrorMessage(TEST_NAME, 3))
      console.log(step2Hint)
    } else if (!passedStep3Heuristics) {
      console.log(constructErrorMessage(TEST_NAME, 3, `This function should place '1' in parentElement (counter should increase to 1) after first call but got ${string1}`));
      console.log(step3Hint)
    } else {
      console.log(constructErrorMessage(TEST_NAME, 3, `This function should place '1' in parent (counter should increase to 1) after first call but got '${string1}'`));
    }
    return false;
  }

  if ((value2 - value1) !== 1) {
    console.error(constructErrorMessage(TEST_NAME, 2, `This function should increment value in parent by 1 but consecutive calls to the same counter but got '${string1}' and '${string2}'`));
    console.log(step2Hint);
    return false;
  }

  let parentElement2 = document.createElement("div");
  let string3;
  let value3;

  callUserCode(() => {
    incrementCounter("newCounter", parentElement2);
    string3 = parentElement2.innerHTML;
    value3 = Number(parentElement2.innerHTML);
  });
 
  if (value3 !== 1) {
    console.error(constructErrorMessage(TEST_NAME, 2, `This function should place '1' in parent after first call with new counterName but got '${string3}'`));
    return false;
  }

  outputPassMessage(TEST_NAME);
  return true;
}

function runAllTests() {
  let tests = [
    createNewCardTest,
    appendNewCardTest, 
    shuffleCardImageClassesTest,
    createCardsTest,
    doCardsMatchTest,
    incrementCounterTest];
  let passed = true;

  tests.forEach((test) => {
    passed &= test();
  });

  if (passed) {
    console.log("ALL TESTS PASSES!!!!");
  } else {
    console.log("TEST RUN FAILED");
  }
}
