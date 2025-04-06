document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('checkButton');
    const chineseTextArea = document.getElementById('chineseText');
    const highlightedTextDiv = document.getElementById('highlightedText');
    
    // Will store vocabulary from two different sources
    let vocabCiMap = new Map(); // for vocab_ci.txt -> [pinyin, definition]
    let vocabYtMap = new Map(); // for vocab_yt.txt -> [pinyin, definition]
    let pieChart = null; // Will store the Chart.js instance
    
    // Promise to load both vocabulary files
    Promise.all([
        // Fetch and parse the first vocabulary file (CI)
        fetch('vocab_ci.txt')
            .then(response => response.text())
            .then(text => {
                const lines = text.split('\n');
                
                for (const line of lines) {
                    if (line.trim() === '' || line.startsWith('#')) continue;
                    
                    // Split by tab character specifically
                    const parts = line.split('\t');
                    if (parts.length >= 3) {
                        const word = parts[0].trim();
                        const pinyin = parts[1].trim();
                        const definition = parts[2].trim();
                        
                        if (word) {
                            vocabCiMap.set(word, [pinyin, definition]);
                        }
                    }
                }
                
                console.log(`Loaded ${vocabCiMap.size} vocabulary entries from CI`);
            }),
        
        // Fetch and parse the second vocabulary file (YT)
        fetch('vocab_yt.txt')
            .then(response => response.text())
            .then(text => {
                const lines = text.split('\n');
                
                for (const line of lines) {
                    if (line.trim() === '' || line.startsWith('#')) continue;
                    
                    // Split by tab character specifically
                    const parts = line.split('\t');
                    if (parts.length >= 3) {
                        const word = parts[0].trim();
                        const pinyin = parts[1].trim();
                        const definition = parts[2].trim();
                        
                        if (word) {
                            vocabYtMap.set(word, [pinyin, definition]);
                        }
                    }
                }
                
                console.log(`Loaded ${vocabYtMap.size} vocabulary entries from YT`);
            })
    ])
    .catch(error => {
        console.error('Error loading vocabulary files:', error);
    });
    
    // Add event listener to the check button
    checkButton.addEventListener('click', function() {
        processText();
    });
    
    // Process the text and highlight characters
    function processText() {
        const text = chineseTextArea.value;
        if (!text) return;
        
        highlightedTextDiv.innerHTML = '';
        
        // Map to track unknown characters and their count
        let unknownCharsMap = new Map();
        
        // Track counts for the pie chart
        let knownCiCharCount = 0;
        let knownYtCharCount = 0;
        let unknownCharCount = 0;
        
        // Process text by lines to preserve newlines
        const lines = text.split('\n');
        
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            
            // Process each line character by character
            let i = 0;
            while (i < line.length) {
                let found = false;
                let foundLength = 0;
                let foundPinyin = '';
                let foundDefinition = '';
                let foundSource = '';
                
                // Modified search order: check both sources at each length before moving to shorter combinations
                // 4 characters, vocab_ci
                if (!found && i + 4 <= line.length) {
                    const segment = line.substring(i, i + 4);
                    if (vocabCiMap.has(segment)) {
                        found = true;
                        foundLength = 4;
                        const vocabInfo = vocabCiMap.get(segment);
                        foundPinyin = vocabInfo[0];
                        foundDefinition = vocabInfo[1];
                        foundSource = 'ci';
                    }
                }
                
                // 4 characters, vocab_yt
                if (!found && i + 4 <= line.length) {
                    const segment = line.substring(i, i + 4);
                    if (vocabYtMap.has(segment)) {
                        found = true;
                        foundLength = 4;
                        const vocabInfo = vocabYtMap.get(segment);
                        foundPinyin = vocabInfo[0];
                        foundDefinition = vocabInfo[1];
                        foundSource = 'yt';
                    }
                }
                
                // 3 characters, vocab_ci
                if (!found && i + 3 <= line.length) {
                    const segment = line.substring(i, i + 3);
                    if (vocabCiMap.has(segment)) {
                        found = true;
                        foundLength = 3;
                        const vocabInfo = vocabCiMap.get(segment);
                        foundPinyin = vocabInfo[0];
                        foundDefinition = vocabInfo[1];
                        foundSource = 'ci';
                    }
                }
                
                // 3 characters, vocab_yt
                if (!found && i + 3 <= line.length) {
                    const segment = line.substring(i, i + 3);
                    if (vocabYtMap.has(segment)) {
                        found = true;
                        foundLength = 3;
                        const vocabInfo = vocabYtMap.get(segment);
                        foundPinyin = vocabInfo[0];
                        foundDefinition = vocabInfo[1];
                        foundSource = 'yt';
                    }
                }
                
                // 2 characters, vocab_ci
                if (!found && i + 2 <= line.length) {
                    const segment = line.substring(i, i + 2);
                    if (vocabCiMap.has(segment)) {
                        found = true;
                        foundLength = 2;
                        const vocabInfo = vocabCiMap.get(segment);
                        foundPinyin = vocabInfo[0];
                        foundDefinition = vocabInfo[1];
                        foundSource = 'ci';
                    }
                }
                
                // 2 characters, vocab_yt
                if (!found && i + 2 <= line.length) {
                    const segment = line.substring(i, i + 2);
                    if (vocabYtMap.has(segment)) {
                        found = true;
                        foundLength = 2;
                        const vocabInfo = vocabYtMap.get(segment);
                        foundPinyin = vocabInfo[0];
                        foundDefinition = vocabInfo[1];
                        foundSource = 'yt';
                    }
                }
                
                // 1 character, vocab_ci
                if (!found && i + 1 <= line.length) {
                    const segment = line.substring(i, i + 1);
                    if (vocabCiMap.has(segment)) {
                        found = true;
                        foundLength = 1;
                        const vocabInfo = vocabCiMap.get(segment);
                        foundPinyin = vocabInfo[0];
                        foundDefinition = vocabInfo[1];
                        foundSource = 'ci';
                    }
                }
                
                // 1 character, vocab_yt
                if (!found && i + 1 <= line.length) {
                    const segment = line.substring(i, i + 1);
                    if (vocabYtMap.has(segment)) {
                        found = true;
                        foundLength = 1;
                        const vocabInfo = vocabYtMap.get(segment);
                        foundPinyin = vocabInfo[0];
                        foundDefinition = vocabInfo[1];
                        foundSource = 'yt';
                    }
                }
                
                if (found) {
                    const segment = line.substring(i, i + foundLength);
                    const sourceLabel = foundSource === 'ci' ? 'CI' : 'YT';
                    const tooltip = `${segment} [${foundPinyin}]: ${foundDefinition} (${sourceLabel})`;
                    
                    // Create a single span for the entire word with tooltip
                    const wordSpan = document.createElement('span');
                    wordSpan.textContent = segment;
                    
                    // Apply appropriate class based on the source
                    if (foundSource === 'ci') {
                        wordSpan.classList.add('highlight-known-ci');
                        knownCiCharCount += segment.length;
                    } else {
                        wordSpan.classList.add('highlight-known-yt');
                        knownYtCharCount += segment.length;
                    }
                    
                    // Add tooltip to the word
                    const tooltipSpan = document.createElement('span');
                    tooltipSpan.classList.add('tooltip');
                    tooltipSpan.textContent = tooltip;
                    wordSpan.appendChild(tooltipSpan);
                    
                    highlightedTextDiv.appendChild(wordSpan);
                    
                    i += foundLength;
                } else {
                    // Character not found in vocabulary
                    const charSpan = document.createElement('span');
                    charSpan.textContent = line[i];
                    charSpan.classList.add('highlight-unknown');
                    charSpan.setAttribute('title', 'Click to mark as added to your deck');
                    charSpan.setAttribute('data-char', line[i]); // Store the character for reference
                    charSpan.addEventListener('click', function() {
                        // Toggle the marked state
                        this.classList.toggle('marked-as-added');
                        
                        // Update all instances of this character in the text
                        const character = this.getAttribute('data-char');
                        document.querySelectorAll(`.highlight-unknown[data-char="${character}"]`).forEach(elem => {
                            if (this.classList.contains('marked-as-added')) {
                                elem.classList.add('marked-as-added');
                            } else {
                                elem.classList.remove('marked-as-added');
                            }
                        });
                        
                        // Also update the character card if it exists
                        const charCard = document.querySelector(`.char-card[data-char="${character}"]`);
                        if (charCard) {
                            if (this.classList.contains('marked-as-added')) {
                                charCard.classList.add('marked-as-added');
                            } else {
                                charCard.classList.remove('marked-as-added');
                            }
                        }
                        
                        // Update the marked counter
                        updateMarkedCounter();
                    });
                    highlightedTextDiv.appendChild(charSpan);
                    
                    // Track unknown character
                    if (unknownCharsMap.has(line[i])) {
                        unknownCharsMap.set(line[i], unknownCharsMap.get(line[i]) + 1);
                    } else {
                        unknownCharsMap.set(line[i], 1);
                    }
                    
                    // Count each unknown character
                    unknownCharCount++;
                    
                    i++;
                }
            }
            
            // Add a line break after each line (except the last one)
            if (lineIndex < lines.length - 1) {
                const newlineSpan = document.createElement('span');
                newlineSpan.classList.add('newline');
                highlightedTextDiv.appendChild(newlineSpan);
            }
        }
        
        // Display unknown characters statistics
        displayUnknownCharStats(unknownCharsMap);
        
        // Display pie chart with character breakdown
        displayCharacterPieChart(knownCiCharCount, knownYtCharCount, unknownCharCount);
    }
    
    // Function to display unknown character statistics
    function displayUnknownCharStats(unknownCharsMap) {
        // Check if stats section already exists, if not create it
        let statsSection = document.getElementById('unknown-stats');
        if (!statsSection) {
            statsSection = document.createElement('div');
            statsSection.id = 'unknown-stats';
            statsSection.classList.add('stats-section');
            
            const statsTitle = document.createElement('h2');
            statsTitle.textContent = 'Unknown Characters';
            statsTitle.classList.add('stats-title');
            statsSection.appendChild(statsTitle);
            
            const statsContent = document.createElement('div');
            statsContent.id = 'stats-content';
            statsContent.classList.add('stats-content');
            statsSection.appendChild(statsContent);
            
            // Insert after output section
            document.querySelector('.output-section').after(statsSection);
        }
        
        const statsContent = document.getElementById('stats-content');
        statsContent.innerHTML = '';
        
        // If no unknown characters found
        if (unknownCharsMap.size === 0) {
            statsContent.innerHTML = '<div class="no-unknown">No unknown characters found! 👏</div>';
            return;
        }
        
        // Sort unknown characters by occurrence (descending)
        const sortedChars = [...unknownCharsMap.entries()]
            .sort((a, b) => b[1] - a[1]);
        
        // Create a statistics summary
        const totalUnknown = sortedChars.reduce((sum, [_, count]) => sum + count, 0);
        const uniqueUnknown = sortedChars.length;
        
        const statsSummary = document.createElement('div');
        statsSummary.classList.add('stats-summary');
        
        // Add marked counter element to be updated later
        const markedCounter = document.createElement('div');
        markedCounter.id = 'marked-counter';
        markedCounter.classList.add('marked-counter');
        markedCounter.innerHTML = '<span id="marked-count">0</span> / <span id="unique-unknown">' + uniqueUnknown + '</span> characters marked as added';
        
        statsSummary.innerHTML = `
            <div class="summary-item">
                <span class="summary-value">${totalUnknown}</span>
                <span class="summary-label">Total Unknown</span>
            </div>
            <div class="summary-item">
                <span class="summary-value">${uniqueUnknown}</span>
                <span class="summary-label">Unique Characters</span>
            </div>
        `;
        statsContent.appendChild(statsSummary);
        statsContent.appendChild(markedCounter);
        
        // Create the character cards container
        const charCardsContainer = document.createElement('div');
        charCardsContainer.classList.add('char-cards-container');
        
        // Add character cards for each unknown character
        sortedChars.forEach(([char, count]) => {
            const charCard = document.createElement('div');
            charCard.classList.add('char-card');
            charCard.setAttribute('data-char', char); // Add data attribute
            
            // Check if this character is already marked as added in the text
            const isMarked = document.querySelector(`.highlight-unknown[data-char="${char}"].marked-as-added`) !== null;
            if (isMarked) {
                charCard.classList.add('marked-as-added');
            }
            
            // Calculate size factor based on count relative to max count
            const maxCount = sortedChars[0][1];
            const sizeFactor = 0.5 + (count / maxCount) * 0.5; // Range from 0.5 to 1.0
            
            // Create content
            const charContent = document.createElement('div');
            charContent.classList.add('char-content');
            
            // Create character element
            const charElement = document.createElement('div');
            charElement.classList.add('char');
            charElement.style.fontSize = `${Math.round(60 * sizeFactor)}px`;
            charElement.textContent = char;
            
            // Create count element
            const countElement = document.createElement('div');
            countElement.classList.add('char-count');
            countElement.textContent = count;
            
            // Assemble the card
            charContent.appendChild(charElement);
            charContent.appendChild(countElement);
            charCard.appendChild(charContent);
            
            // Add click event
            charCard.addEventListener('click', () => {
                charCard.classList.toggle('marked-as-added');
                
                // Update all instances of this character in the text
                document.querySelectorAll(`.highlight-unknown[data-char="${char}"]`).forEach(elem => {
                    if (charCard.classList.contains('marked-as-added')) {
                        elem.classList.add('marked-as-added');
                    } else {
                        elem.classList.remove('marked-as-added');
                    }
                });
                
                // Update the marked counter
                updateMarkedCounter();
            });
            
            charCardsContainer.appendChild(charCard);
        });
        
        statsContent.appendChild(charCardsContainer);
        
        // Set initial marked count
        updateMarkedCounter();
    }
    
    // Add this function to update the marked counter
    function updateMarkedCounter() {
        const markedCount = document.querySelectorAll('.char-card.marked-as-added').length;
        const markedCountElement = document.getElementById('marked-count');
        if (markedCountElement) {
            markedCountElement.textContent = markedCount;
        }
    }
    
    // Function to display pie chart of known vs unknown characters
    function displayCharacterPieChart(knownCiCount, knownYtCount, unknownCount) {
        // Check if chart section already exists, if not create it
        let chartSection = document.getElementById('character-chart');
        if (!chartSection) {
            chartSection = document.createElement('div');
            chartSection.id = 'character-chart';
            chartSection.classList.add('chart-section');
            
            const chartTitle = document.createElement('h2');
            chartTitle.textContent = 'Character Analysis';
            chartTitle.classList.add('chart-title');
            chartSection.appendChild(chartTitle);
            
            // Create container for the chart and legend
            const chartContainer = document.createElement('div');
            chartContainer.classList.add('chart-container');
            
            // Create wrapper for the chart
            const chartWrapper = document.createElement('div');
            chartWrapper.classList.add('chart-wrapper');
            
            // Create canvas for Chart.js
            const chartCanvas = document.createElement('canvas');
            chartCanvas.id = 'pieChart';
            chartWrapper.appendChild(chartCanvas);
            chartContainer.appendChild(chartWrapper);
            
            // Add chart container to section
            chartSection.appendChild(chartContainer);
            
            // Create legend
            const chartLegend = document.createElement('div');
            chartLegend.classList.add('chart-legend');
            chartLegend.innerHTML = `
                <div class="legend-item">
                    <span class="legend-color legend-known-ci"></span>
                    <span>Comprehensible Input</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color legend-known-yt"></span>
                    <span>YouTube</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color legend-unknown"></span>
                    <span>Unknown Characters</span>
                </div>
            `;
            chartSection.appendChild(chartLegend);
            
            // Create stats text
            const chartStats = document.createElement('div');
            chartStats.id = 'chart-stats';
            chartStats.classList.add('chart-stats');
            chartSection.appendChild(chartStats);
            
            // Insert after stats section or output section if no stats section
            const statsSection = document.getElementById('unknown-stats');
            if (statsSection) {
                statsSection.after(chartSection);
            } else {
                document.querySelector('.output-section').after(chartSection);
            }
        }
        
        // Update chart stats text
        const total = knownCiCount + knownYtCount + unknownCount;
        const knownPercentage = total > 0 ? Math.round(((knownCiCount + knownYtCount) / total) * 100) : 0;
        
        const chartStats = document.getElementById('chart-stats');
        chartStats.innerHTML = `
            <p>You know <span class="chart-percentage">${knownPercentage}%</span> of the characters in this text.</p>
            <p>Total characters: ${total} (${knownCiCount} Comprehensible Input, ${knownYtCount} YouTube, ${unknownCount} unknown)</p>
        `;
        
        // Create or update pie chart
        const ctx = document.getElementById('pieChart').getContext('2d');
        
        // If chart already exists, destroy it first
        if (pieChart) {
            pieChart.destroy();
        }
        
        // Create new chart
        pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Comprehensible Input', 'YouTube', 'Unknown Characters'],
                datasets: [{
                    data: [knownCiCount, knownYtCount, unknownCount],
                    backgroundColor: ['#c5e1ff', '#a8e6c0', '#ffc591'],
                    borderColor: ['#a8d4ff', '#8ad4a5', '#ffb36e'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '65%',
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}); 