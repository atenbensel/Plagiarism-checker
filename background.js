chrome.contextMenus.create({
    title: "Check for Plagiarism",
    contexts: ["selection"],
    onclick: checkPlagiarism
  });
  
  function checkPlagiarism(info, tab) {
    // Get the selected text
    const selectedText = info.selectionText;
    
    // Perform plagiarism check
    const plagiarismResult = detectPlagiarism(selectedText);
  
    // Open a new tab with the plagiarism check results
    const resultUrl = "https://example.com/plagiarism-check?text=" + encodeURIComponent(selectedText) + "&plagiarism=" + plagiarismResult;
    chrome.tabs.create({ url: resultUrl });
  }
  
  async function detectPlagiarism(text) {
    // Preprocess the text (remove punctuation, convert to lowercase, etc.)
    const processedText = text.toLowerCase().replace(/[^\w\s]/g, "");
  
    // Define a set of known sources (example sentences)
    const knownSources = [
      "The quick brown fox jumps over the lazy dog.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "To be, or not to be: that is the question.",
      "Two roads diverged in a wood, and I took the one less traveled by.",
    ];
  
    // Calculate TF-IDF vectors for the known sources
    const knownSourceVectors = knownSources.map((source) => {
      const processedSource = source.toLowerCase().replace(/[^\w\s]/g, "");
      const sourceWords = processedSource.split(" ");
  
      // Calculate term frequencies
      const termFrequency = {};
      for (const word of sourceWords) {
        termFrequency[word] = termFrequency[word] ? termFrequency[word] + 1 : 1;
      }
  
      // Calculate inverse document frequency
      const inverseDocumentFrequency = {};
      for (const word of sourceWords) {
        inverseDocumentFrequency[word] = Math.log(knownSources.length / (1 + countDocumentsWithWord(knownSources, word)));
      }
  
      // Calculate TF-IDF vector
      const tfidfVector = {};
      for (const word of sourceWords) {
        tfidfVector[word] = termFrequency[word] * inverseDocumentFrequency[word];
      }
  
      return tfidfVector;
    });
  
    // Calculate TF-IDF vector for the text
    const textWords = processedText.split(" ");
    const termFrequencyText = {};
    for (const word of textWords) {
      termFrequencyText[word] = termFrequencyText[word] ? termFrequencyText[word] + 1 : 1;
    }
  
    const inverseDocumentFrequencyText = {};
    for (const word of textWords) {
      inverseDocumentFrequencyText[word] = Math.log(knownSources.length / (1 + countDocumentsWithWord(knownSources, word)));
    }
  
    const tfidfVectorText = {};
    for (const word of textWords) {
      tfidfVectorText[word] = termFrequencyText[word] * inverseDocumentFrequencyText[word];
    }
  
    // Compare the TF-IDF vector of the text against known sources
    const similarityThreshold = 0.1; // Adjust the similarity threshold based on your needs
  
    for (const knownSourceVector of knownSourceVectors) {
      const similarity = calculateCosineSimilarity(tfidfVectorText, knownSourceVector);
  
      if (similarity >= similarityThreshold) {
        // Plagiarism detected
        return true;
      }
    }
  
    // No plagiarism detected, check Google for similar content
    const searchResults = await searchGoogle(processedText);
  
    // Filter out known sources from search results
    const filteredResults = searchResults.filter((result) => !knownSources.includes(result));
  
    // Calculate similarity score for each search result
    for (const result of filteredResults) {
      const processedResult = result.toLowerCase().replace(/[^\w\s]/g, "");
      const resultWords = processedResult.split(" ");
  
      const termFrequencyResult = {};
      for (const word of resultWords) {
        termFrequencyResult[word] = termFrequencyResult[word] ? termFrequencyResult[word] + 1 : 1;
      }
  
      const inverseDocumentFrequencyResult = {};
      for (const word of resultWords) {
        inverseDocumentFrequencyResult[word] = Math.log(filteredResults.length / (1 + countDocumentsWithWord(filteredResults, word)));
      }
  
      const tfidfVectorResult = {};
      for (const word of resultWords) {
        tfidfVectorResult[word] = termFrequencyResult[word] * inverseDocumentFrequencyResult[word];
      }
  
      const similarity = calculateCosineSimilarity(tfidfVectorText, tfidfVectorResult);
  
      if (similarity >= similarityThreshold) {
        // Plagiarism detected
        return true;
      }
    }
  
    // No plagiarism detected
    return false;
  }
  
  function countDocumentsWithWord(documents, word) {
    let count = 0;
  
    for (const document of documents) {
      if (document.toLowerCase().includes(word)) {
        count++;
      }
    }
  
    return count;
  }
  
  function calculateCosineSimilarity(vector1, vector2) {
    const dotProduct = calculateDotProduct(vector1, vector2);
    const magnitude1 = calculateVectorMagnitude(vector1);
    const magnitude2 = calculateVectorMagnitude(vector2);
  
    if (magnitude1 === 0 || magnitude2 === 0) {
      return 0;
    }
  
    return dotProduct / (magnitude1 * magnitude2);
  }
  
  function calculateDotProduct(vector1, vector2) {
    let dotProduct = 0;
  
    for (const word in vector1) {
      if (vector2[word]) {
        dotProduct += vector1[word] * vector2[word];
      }
    }
  
    return dotProduct;
  }
  
  function calculateVectorMagnitude(vector) {
    let sumOfSquares = 0;
  
    for (const word in vector) {
      sumOfSquares += vector[word] * vector[word];
    }
  
    return Math.sqrt(sumOfSquares);
  }
  
  async function searchGoogle(query) {
    const apiKey = "YOUR_GOOGLE_API_KEY";
    const searchEngineId = "YOUR_SEARCH_ENGINE_ID";
  
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.items) {
        const searchResults = data.items.map((item) => item.snippet);
        return searchResults;
      } else {
        throw new Error("No search results found.");
      }
    } catch (error) {
      console.error("Google search error:", error);
      return [];
    }
  }
  
  
  // Load the Google Ads script
  function loadAdsScript() {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
  
  // Initialize Google Ads
  function initializeAds() {
    (adsbygoogle = window.adsbygoogle || []).push({});
  }

