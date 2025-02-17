    document.addEventListener('DOMContentLoaded', () => {
        const goToTopBtn = document.getElementById('goToTopBtn');

        // Show the button when the user scrolls down 200px
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                goToTopBtn.style.display = 'block';
            } else {
                goToTopBtn.style.display = 'none';
            }
        });

        // Scroll to the top when the button is clicked
        goToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scrolling
            });
        });
    });

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleRain = document.getElementById('toggleRain');
    const toggleSnow = document.getElementById('toggleSnow');
    const toggleLightning = document.getElementById('toggleLightning');
    let scale = 1;
    let opacity = 1;
    let direction = 1; // 1 for zoom in, -1 for zoom out
    const speed = 0.0005; // Speed of the animation
    let colorHue = 0; // For color shift effect
    let animationFrameId;
    let rainIntervalId;
    let snowIntervalId;

    // Function to create raindrops
    function createRaindrop() {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        raindrop.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        raindrop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`; // Random fall speed
        body.appendChild(raindrop);

        // Remove raindrop after it falls
        raindrop.addEventListener('animationend', () => {
            raindrop.remove();
        });
    }

    // Function to create snowflakes
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random fall speed
        body.appendChild(snowflake);

        // Remove snowflake after it falls
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
        });
    }

    // Function to animate the background
    function animateBackground() {
        // Update scale and opacity with easing
        scale += direction * speed;
        opacity -= direction * speed * 1.5;

        // Apply the transformations
        body.style.backgroundSize = `${scale * 100}%`;
        body.style.opacity = opacity;

        // Add a color shift effect
        colorHue = (colorHue + 0.1) % 360; // Increment hue for color shift
        body.style.backgroundColor = `hsl(${colorHue}, 50%, 50%)`;

        // Reverse direction when reaching limits
        if (scale >= 1.5 || scale <= 1) {
            direction *= -1;
        }

        // Reset opacity to avoid disappearing completely
        if (opacity <= 0.5 || opacity >= 1) {
            opacity = 1;
        }

        animationFrameId = requestAnimationFrame(animateBackground);
    }

    // Start the background animation
    animateBackground();

    // Function to start raining
    function startRaining() {
        rainIntervalId = setInterval(createRaindrop, 50); // Create raindrops every 50ms
    }

    // Function to stop raining
    function stopRaining() {
        clearInterval(rainIntervalId);
        // Remove all existing raindrops
        document.querySelectorAll('.raindrop').forEach(raindrop => raindrop.remove());
    }

    // Function to start snowing
    function startSnowing() {
        snowIntervalId = setInterval(createSnowflake, 100); // Create snowflakes every 100ms
    }

    // Function to stop snowing
    function stopSnowing() {
        clearInterval(snowIntervalId);
        // Remove all existing snowflakes
        document.querySelectorAll('.snowflake').forEach(snowflake => snowflake.remove());
    }


    // Toggle between background animation and rain
    toggleRain.addEventListener('change', () => {
        if (toggleRain.checked) {
            // Stop background animation
            cancelAnimationFrame(animationFrameId);
            body.style.backgroundSize = 'cover'; // Reset background size
            body.style.opacity = '1'; // Reset opacity
            body.style.backgroundColor = '#121931'; // Reset background color
            startRaining(); // Start raining
        } else {
            // Stop raining and restart background animation
            stopRaining();
            animateBackground();
        }
    });

    // Toggle snow effect
    toggleSnow.addEventListener('change', () => {
        if (toggleSnow.checked) {
            startSnowing(); // Start snowing
        } else {
            stopSnowing(); // Stop snowing
        }
    });

});


// Add event listener to the checkbox
document.getElementById('toggleContainer').addEventListener('change', function () {
    const container2 = document.querySelector('.container2');
    const container3 = document.querySelector('.container3');

    if (this.checked) {
        container2.style.display = 'none'; // Hide container2
        container3.style.display = 'block'; // Show container3
    } else {
        container2.style.display = 'block'; // Show container2
        container3.style.display = 'none'; // Hide container3
    }
});


let images = {}; // Global variable to hold the images mapping
let prompts = {}; // Global variable to hold the prompts

// Function to create dynamic selects and search box
function createSelects() {
    const selectContainer = document.getElementById("dynamicSelects");

    // Create the first select element
    const select1 = document.createElement("select");
    select1.className = "style-select";
    select1.onchange = function () {
        updateImage(); // Update image when the style is changed
        updateText(); // Update text when the style is changed

        // Show or hide the search box based on the selected option
        const searchBox = document.getElementById("searchBox");
        if (select1.value === "None") {
            searchBox.style.display = "block"; // Show search box
        } else {
            searchBox.style.display = "none"; // Hide search box
        }
    };

    // Add options to the select element
    const options1 = [
        "None",
        "cinematic-default",
        "3d-model",
        "analog film",
        "anime",
        "cinematic",
        "comic book",
        "craft clay",
        "digital art",
        "enhance",
        "fantasy art",
        "isometric",
        "line art",
        "lowpoly",
        "neonpunk",
        "origami",
        "photographic",
        "pixel art",
        "texture",
        "ads-advertising",
        "ads-automotive",
        "ads-corporate",
        "ads-fashion editorial",
        "ads-food photography",
        "ads-luxury",
        "ads-real estate",
        "ads-retail",
        "artstyle-abstract",
        "artstyle-abstract expressionism",
        "artstyle-art deco",
        "artstyle-art nouveau",
        "artstyle-constructivist",
        "artstyle-cubist",
        "artstyle-expressionist",
        "artstyle-graffiti",
        "artstyle-hyperrealism",
        "artstyle-impressionist",
        "artstyle-pointillism",
        "artstyle-pop art",
        "artstyle-psychedelic",
        "artstyle-renaissance",
        "artstyle-steampunk",
        "artstyle-surrealist",
        "artstyle-typography",
        "artstyle-watercolor",
        "futuristic-biomechanical",
        "futuristic-biomechanical cyberpunk",
        "futuristic-cybernetic",
        "futuristic-cybernetic robot",
        "futuristic-cyberpunk cityscape",
        "futuristic-futuristic",
        "futuristic-retro cyberpunk",
        "futuristic-retro futurism",
        "futuristic-sci-fi",
        "futuristic-vaporwave",
        "game-bubble bobble",
        "game-cyberpunk game",
        "game-fighting game",
        "game-gta",
        "game-mario",
        "game-minecraft",
        "game-pokemon",
        "game-retro arcade",
        "game-retro game",
        "game-rpg fantasy game",
        "game-strategy game",
        "game-streetfighter",
        "game-zelda",
        "misc-architectural",
        "misc-disco",
        "misc-dreamscape",
        "misc-dystopian",
        "misc-fairy tale",
        "misc-gothic",
        "misc-grunge",
        "misc-horror",
        "misc-kawaii",
        "misc-lovecraftian",
        "misc-macabre",
        "misc-manga",
        "misc-metropolis",
        "misc-minimalist",
        "misc-monochrome",
        "misc-nautical",
        "misc-space",
        "misc-stained glass",
        "misc-techwear fashion",
        "misc-tribal",
        "misc-zentangle",
        "papercraft-collage",
        "papercraft-flat papercut",
        "papercraft-kirigami",
        "papercraft-paper mache",
        "papercraft-paper quilling",
        "papercraft-papercut collage",
        "papercraft-papercut shadow box",
        "papercraft-stacked papercut",
        "papercraft-thick layered papercut",
        "photo-alien",
        "photo-film noir",
        "photo-hdr",
        "photo-long exposure",
        "photo-neon noir",
        "photo-silhouette",
        "photo-tilt-shift",
        "cinematic-diva",
        "Abstract Expressionism",
        "Academia",
        "Action Figure",
        "Adorable 3D Character",
        "Adorable Kawaii",
        "Art Deco",
        "Art Nouveau",
        "Astral Aura",
        "Avant-garde",
        "Baroque",
        "Bauhaus-Style Poster",
        "Blueprint Schematic Drawing",
        "Caricature",
        "Cel Shaded Art",
        "Character Design Sheet",
        "Classicism Art",
        "Color Field Painting",
        "Colored Pencil Art",
        "Conceptual Art",
        "Constructivism",
        "Cubism",
        "Dadaism",
        "Dark Fantasy",
        "Dark Moody Atmosphere",
        "DMT Art Style",
        "Doodle Art",
        "Double Exposure",
        "Dripping Paint Splatter Art",
        "Expressionism",
        "Faded Polaroid Photo",
        "Fauvism",
        "Flat 2D Art",
        "Fortnite Art Style",
        "Futurism",
        "Glitchcore",
        "Glo-fi",
        "Googie Art Style",
        "Graffiti Art",
        "Harlem Renaissance Art",
        "High Fashion",
        "Idyllic",
        "Impressionism",
        "Infographic Drawing",
        "Ink Dripping Drawing",
        "Japanese Ink Drawing",
        "Knolling Photography",
        "Light Cheery Atmosphere",
        "crayon drawing",
        "Logo Design",
        "Luxurious Elegance",
        "Macro Photography",
        "Mandola Art",
        "Marker Drawing",
        "Medievalism",
        "Minimalism",
        "Neo-Baroque",
        "Neo-Byzantine",
        "Neo-Futurism",
        "Neo-Impressionism",
        "Neo-Rococo",
        "Neoclassicism",
        "Op Art",
        "Ornate and Intricate",
        "Pencil Sketch Drawing",
        "Pop Art 2",
        "Rococo",
        "Silhouette Art",
        "Simple Vector Art",
        "Sketchup",
        "Steampunk 2",
        "Surrealism",
        "Suprematism",
        "Terragen",
        "Tranquil Relaxing Atmosphere",
        "Sticker Designs",
        "Vibrant Rim Light",
        "Volumetric Lighting",
        "Watercolor 2",
        "Whimsical and Playful",
        "Cardboard-Style",
        "oil painting-Realism",
        "Cute figurine",
        "tattoo design",
        "molding-style",
        "Cute Anime，Ghibli",
        "Cute 3D icon",
        "Japan Anime",
        "1980s Photo",
        "Embroidery and Needlework",
        "Patchwork and Quilting",
        "Felting and Fiber Arts",
        "Knitting and Crocheting",
        "Crocheting Characters",
        "T-Shirt Printing-Style",
        "T-Shirt Printing-Style: Vintage Retro Illustration",
        "T-Shirt Printing-Style: Abstract Artwork",
        "T-Shirt Printing-Style: Pop Culture Iconography",
        "T-Shirt Printing-Style: Nature and Wildlife",
        "Cardboard crafts: Furniture Design",
        "Cardboard crafts: Costume or Prop",
        "Cardboard crafts: Model Making",
        "Realistic Sticker Design",
        "Cardboard crafts: helmet ",
        "Helmet design",
        "AutoCAD-style",
        "3D Print-style",
        "Manga Characters",
        "Realistic 3D character-Style",
        "Packing design-style",
        "Animal shape vase-style",
        "Animal shape Chinese vase-style",
        "handicapped-style",
        "Human pose-style",
        "4K movie-style",
        "1960s movie-style",
        "old photos torn-style",
        "3D logo Design",
        "water bottle-style",
        "Geometric Acrylic Banner",
        "Colored Pencils Drawing: full-body",
        "sketching",
        "wooden toy ",
        "Wooden Furniture-style",
        "Realistic Caricature-Style",
        "Full body Vector",
        "Pop-up card-Style",
        "Mug-style",
        "Copper sculpture-Style",
        "Thai silver art-Style",
        "Furniture Design",
        "Realistic Cute figurine",
        "Acrylic furniture-Stlye",
        "Giant animal transported",
        "Architecture design",
        "Fan-Design",
        "sculpture Wooden Design",
        "spice cans design",
        "vacuum design",
        "Kid motorcycle design",
        "buildings-fruits Vegetables Design",
        "Motorbike modified, mobile café shop",
        "CNC 3D puzzles ",
        "Kid's Toy Design",
        "Ceramic tile design",
        "Vehicle design",
        "Trailer design",
        "GTA-6 style",
        "wooden sculpture ",
        "vehicle plastic design",
        "vehicle Fruit design",
        "Paper cutting design",
        "Ecological art",
        " Collectible toy",
        "PC Case Model Design",
        "Mobile motorcycle Cafe bar",
        "Gaming PC case",
        "Flat Art Style 2",
        "porcelain style",
        "rattan style",
        "Polar Panorama-style",
        "group anime characters",
        "portrait paper cutout",
        "3D rock-shaped",
        "Motor Front Car",
        "Fruit Crying",
        "Draw with thread-realism ",
        "stylized line art-style",
        "Sculpture scene inside",
        "Realism-style",
        "Leaves-shaped",
        "African boy and crushed wood",
        "crushed wood-shaped",
        "garbage-style",
        "plastic bag-shaped",
        "chalk art-Style",
        "Optical illusions art",
        "Animal 3D Effect",
        "3D polygonal paper",
        "Animal grumpy look",
        "Complicated facial contours",
        "shadow box LED",
        "Mechanical sculpture",
        "Smoke art",
        "Bonfire smoke art",
        "Mechanical Art",
        "Silicone mold-style",
        "across frames-style",
        "flip-flops pattern Design",
        "Sandstone-Style",
        "Old tires-style",
        "Bag-Wallet Design",
        "Bag-Wallet Design 2",
        "Breaking wall-style",
        "Wall decoration art",
        "Name card design",
        "Animal head wall decor",
        "Collage Mixed media",
        "Draw with threa-Colorful",
        "Gouache Painting",
        "Fresco Painting",
        "Mosaic Painting:",
        "Nihonga Painting",
        "anime drawing",
        "oil painting-portrait",
        "T-Shirt Design",
        "Bauhaus-style poster 2",
        "Living Room design",
        "bedroom design",
        "Kitchen design",
        "Shop Design",
        "Palm tree-style",
        "Coconut shell-style",
        "coconut shell",
        "Sand Art",
        "Indian henna designs",
        "Rain art-style",
        "Flame-style",
        "Flame art",
        "Wall art print",
        "Flower-style",
        "idol-style",
        "Pottery-style",
        "Polymer clay-style",
        "clay-style",
        "Walnut Shell Art",
        "Pebbles art",
        "emerald-style",
        "ruby-style",
        "Sapphire-style",
        "Jadeite-style",
        "Money-style",
        "paper cutting silhouette",
        "Throw water art",
        "Product sketching",
        "Room design",
        "Cardboard Three-dimensional",
        "Stylized artistic sculpture",
        "strawberries-Style",
        "vehicle Wooden body",
        "vehicle-style",
        "Pixar-style",
        "Realistic monster-style",
        "Realistic alien-style",
        "Security camera screen view",
        "Hot wheel Racing",
        "Hot Wheels Collection",
        "digital painting-Style",
        "Forza Horizon 5 racing",
        "DIRT 5 racing",
        "DIRT RALLY 2.0 racing",
        "Minimal Style",
        "Pixar Character",
        "Pixar Animals",
        "Pixar Fantasy",
        "Modern Condo design",
        "MotoGP design",
        "Motorcycle design",
        "Futuristic Animal robot",
        "Fallout 4 Car-style",
        "Kids Car",
        "office design",
        "warrior suit",
        "Graphic novel-style",
        "Woven Bamboo House Design",
        "Woven Bamboo Home Deco",
        "Straw House Design",
        "woven bamboo building",
        "skeleton Art",
        "Vehicle skeletal",
        "Pebbles art",
        "architectural drawing",
        "Animal head wall decor 2",
        "kids clothes design",
        "whimsical bookshelf",
        "3D anaglyph",
"3D render",
"8-bit art",
"Abstract design",
"Abstract style",
"Aerial photo",
"Alternate history",
"Ambrotype",
"Art brut",
"Art deco",
"Baroque",
"Bird’s eye view",
"Black and white photo",
"Caravaggism",
"Caricature",
"Cartoon",
"Cinematic style",
"Classic",
"Close-up",
"Cloud design",
"Collage art",
"Conceptual photo",
"Cross processing",
"Cyber gothic",
"Cyberpunk style",
"Daguerreotype",
"Digital art",
"Documentary style",
"Double exposure effect",
"Dystopian",
"Extreme close-up",
"Eye level",
"Fairy tale",
"Fantasy photo",
"Film noir",
"Fine art photo",
"Fish-eye",
"Fisheye lens",
"Flat design",
"Flat lay",
"Folk art",
"Food photo",
"Freeze frame",
"Futurism",
"Futuristic",
"Glamour photo",
"Glitch art",
"Gothic horror",
"Hand-drawn animation",
"High contrast",
"High poly",
"Horror",
"Hyper realistic",
"Impressionist style",
"Industrial",
"folk art style",
"Low angle",
"Low contrast",
"Low poly",
"Magazine style",
"Magical realism",
"Makeup transformation",
"Manipulated",
"Masked portrait",
"Medical",
"Mid-century modern wedding",
"Minimalist",
"Mixed media",
"Modern",
"Monochrome photo",
"Moody photo",
"Motion blur",
"Multiple exposure",
"Mythological",
"Neon glow",
"Noir",
"Oil Painting",
"Op art",
"Overexposed",
"Panoramic photo",
"Pastel colors",
"Photo collage",
"Photogrammetry",
"Pixelated",
"Pointillism",
"Polaroid style",
"Pop art",
"Portrait photo",
"Post-apocalyptic",
"Prismatic",
"Product photo",
"Realistic photo",
"Recycled art",
"Reflection",
"Retro style",
"Rococo",
"Sci-fi",
"Scientific illustration",
"Selfie photo",
"Sepia tone",
"Shallow depth of field",
"Silhouette photo",
"Soft focus",
"Soft glamour",
"Southern Gothic",
"Space fantasy",
"Spherical",
"Steampunk",
"Stippled",
"Street photo",
"Tech noir",
"Tilt-shift effect",
"Triptych photo",
"Underexposed",
"Vintage film",
"Vintage style",
"Weird West",
"Wide angle",
"Wireframe",
"Worm’s eye view",
"Zigzag lines",
"Abstract wall art",
"Street art mural",
"Historical wall fresco",
"Surreal wall art",
"Vintage poster wall art",
"Digital wall art",
"Cultural tapestry",
"Cubist wall painting",
"Floral wall art",
"Impressionist wall painting",
"Fantasy wall mural",
"Monochrome wall art",
"Art deco wall piece",
"Ethnic wall art",
"Kinetic wall sculpture",
"Street art",
"2D animation",
"3D animation",
"3D lenticular",
"3D Pop Out",
"Activist art",
"Appropriation art",
"Art nouveau",
"Art satire",
"Artificial Bloom",
"Artistic expression",
"Bauhaus art",
"Bespoke fashion",
"Bio art",
"Biomorphic art",
"Biotechnology art",
"Blacklight/Neon Glow",
"Blind art",
"Blueprint",
"Bokeh",
"Broken Glass/Shattered",
"Burnt Film Effect",
"Cartoon Effect",
"Chalk/Charcoal Drawing",
"Chance art",
"Cinematic Color Grading",
"Coachella fashion",
"Color Blocking",
"Color Splash",
"Color splash pop",
"Comic Halftone",
"Conceptual art",
"Contour/Bas Relief",
"Cosmic Ceremony[Cosmic ceremony",
"Colored pencil style",
"Creative editing",
"Cross-Processing",
"Cryptic Puzzle/Jigsaw Overlay",
"Crystal Ball Effect",
"Cubism",
"Cyber fashion",
"Cyber/Augmented Reality",
"Cybernetic art",
"Dada Art",
"Dappled Light/Textural Play",
"De Stijl",
"Deconstructionist art",
"Deep Dream",
"Digital collage",
"Distorted Reality",
"Double Exposure Silhouette",
"Double Exposure",
"Dramatic Lighting",
"Dramatic Spotlight",
"Dreamy Glow/Halos",
"Duo/Trichrome",
"Dust & Scratches",
"Dynamic Blur",
"Dynamic Color Shift",
"Dystopian Urbanscape",
"Eco-art",
"Emboss",
"Embroidery/Stitch Pattern",
"Ethereal Light Beams",
"Exploding Fragments",
"Feminist art",
"Fine art composite",
"Fine art nude",
"Fog or Mist Overlay",
"Fractal Patterns",
"Fresco Art",
"Futuristic fashion",
"Golden Light",
"Gothic/Dark Fantasy",
"Graffiti/Street Art",
"Ice/Cold Effect",
"Inception/Conceptual Layers",
"Inclusive art",
"Isometric view",
"Kinetic typography",
"Lenticular/3D Motion",
"Light Leak",
"Line art",
"Liquify/Swirl",
"Lomo Effect",
"Low Key",
"Magic Realism",
"Medical illustration",
"Metallic",
"Minimalism",
"Mood Lighting",
"Mosaic",
"Motion capture",
"Motion graphics",
"Murals",
"Naive art",
"Op-art",
"Overlay Textures",
"Paint Splatter",
"Painterly Impressionism",
"Paper Cutout",
"Paper Mache Look",
"Papyrus/Sandstone Texture",
"Parametric art",
"Pencil Sketch",
"Polar Coordinates",
"Polaroid Nostalgia",
"Political art",
"Pop-Up Book Effect",
"Post-colonial art",
"Poster Edge",
"Posterize Gradient",
"Primitive art",
"Protest art",
"Psychedelic/Color Wave",
"Queer art",
"Resort wear",
"Retro 8-Bit",
"Retro Filter",
"Schematic",
"Sharp Relief/3D Emboss",
"Silhouette with Gradient",
"Silhouette",
"Silk/Satin Texture",
"Sketch/Illustration",
"Soft Glow",
"Solar Flare",
"Spectrum Shift",
"Steampunk fashion",
"Stencil art",
"Stippling/Dot Art",
"Storytelling",
"Submission art",
"Sun-Kissed Glow",
"Suprematism",
"Synthetic Lens Distortion",
"Technical drawing",
"Techwear",
"Thermal Imaging Effect",
"Tilt-Shift",
"Time-lapse Glitch",
"Topography",
"Underpainting",
"Underwater/Water Droplets",
"Vector art",
"Vexel",
"Vienna Secession",
"Vintage Frame",
"Vintage Frame/Border",
"Vintage/Retro",
"Volumetric Lighting",
"Warp Speed/Light Trails",
"Water Reflection",
"Watercolor Effect",
"Weathered Grunge",
"Wrap/Distortion",
"Zoological illustration",
"Nostalgic essence",
"coloring book",
"20s Art Deco",
"Abstract Kinetics",
"Abstract",
"Airbrush Realism",
"Allegorical Art",
"Anime/Manga",
"Apocalyptic",
"Arachnid Detailing",
"Architectural Drawing",
"Art Nouveau",
"Astral Digital",
"Astrological Art",
"Atmospheric",
"Audio Visuals",
"Battlefield Art",
"Caribbean Tropical",
"Celestial Mechanics",
"Celtic Knotwork",
"Ceremonial Grandeur",
"Chiaroscuro",
"Chinoiserie",
"Chromatic Chaos",
"Chronicled Histories",
"Cinematic Lighting",
"Classic Art Study",
"Collage",
"Comic Abstract",
"Comic Book",
"Comic Strip",
"Concept Art",
"Conceptual Minimalism",
"Conceptual/Avant-Garde",
"Constructivism",
"Cosmic Art",
"Cosmic Folk Art",
"Cubist Portraiture",
"Cultural Clash",
"Cyberpunk",
"Dadaism",
"Dark Instagram Aesthetic",
"Dawn's Early Light",
"Daydreaming Style",
"Digital Blueprint",
"Digital Drip",
"Digital Fairy Tale",
"Digital Papercut",
"Doodle Punk",
"Dripping Paint",
"Ember Glows",
"Enamel Pin Design",
"Enigmatic Geometry",
"Enlightened Abstraction",
"Ethereal",
"Ethnographic Art",
"Expressionism",
"Fantasy",
"Fauvism",
"Fireside Warmth",
"Floating Islands",
"Floral Boho",
"Folk Art Revival",
"Folklore Art",
"Forest Spirits",
"Frozen Symphonies",
"Ghibli-esque",
"Glass Art",
"Stencil Art",
"Surreal Body Art",
"Tattoo Art",
"Tattoo Flash Art",
"Typographic Art",
"Zen Art",
"Machine Learning-Generated Art",
"Metaphysical Art",
"Minimal Line Art",
"Optical Art",
"Pixel Art",
"Psychoanalytic Art",
"Vintage Advertising Art",
"Gothic Ornamentation Style",
"Gothic Style",
"Gourmet Illustration Style",
"Graffiti Lettering Style",
"Graffiti-style Sketch Style",
"Grunge Style",
"Hauntology Style",
"Heraldic Style",
"Heroic Realism Style",
"High Fantasy Style",
"High Tech Interface Style",
"History Illustration Style",
"Holographic Style",
"Impressionism Style",
"Infographics Style",
"Infrared/Ultraviolet Style",
"Insect Anatomy Style",
"Interdimensional Graphics Style",
"Invisible Cities Style",
"Iridescent Effect Style",
"Isometric Style",
"Jam Poster Aesthetic Style",
"Japanese Brush Painting (Sumi-e) Style",
"Journeyman Sketches Style",
"Kaleidoscope Style",
"Kawaii Style",
"Labyrinthine Paths Style",
"Lava Flow Patterns Style",
"Letterpress Style",
"Lunar Inspirations Style",
"Lunar Landscape Style",
"Luxury Fashion Sketch Style",
"Luxury Sneaker Design Style",
"Manga Fantasy Style",
"Manga Gothic Style",
"Marine Nautical Style",
"Meditative Mandalas Style",
"Mid-Century Modern Style",
"Military Realism Style",
"Minimal Boho Style",
"Minimal Doodles Style",
"Minimal Symbolism Style",
"Minimalist Fantasy Style",
"Minimalist Landscape Style",
"Modern Heraldry Style",
"Modern/Contemporary Style",
"Monogram Style",
"Moorish Revival Style",
"Mosaic Glass Style",
"Musical Inspiration Style",
"Mythical Mechanics Style",
"Mythological Creatures Style",
"Nature's Fury Style",
"Neoclassical Style",
"Neon Genesis Style",
"Neon Noir Style",
"Neon/Glow Style",
"Oceanic Mysteries Style",
"Old Master's Portrait Style",
"Old-Time Carnival Style",
"Ornamental Calligraphy Style",
"Ornate Filigree Style",
"Pagan Symbolism Style",
"Pastel Goth Style",
"Petroglyphs Style",
"Photomontage Style",
"Photorealistic Sci-Fi Style",
"Plush Toy Style",
"Pointillist Impressionism Style",
"Polaroid Effect Style",
"Pop Surrealism Style",
"Post-Impressionist Brushwork Style",
"Post-Modern Parody Style",
"Pre-Raphaelite Style",
"Prohibition Era Style",
"Psychedelic Pop Style",
"Psychedelic Style",
"Pulp Illustration Style",
"Realistic Style",
"Rebel Grunge Style",
"Regency Romance Style",
"Renaissance Futurism Style",
"Renaissance Grotesque Style",
"Renaissance Revival Style",
"Renaissance Sketch Style",
"Retro Digital Style",
"Retro Futurism Style",
"Retro Futuristic Style",
"Rustic Charm Style",
"Sandy Textures Style",
"Sci-Fi Realism Style",
"Seasonal Transitions Style",
"Silk Route Wonders Style",
"Silk Screen Style",
"Sketch Style",
"Soap Bubble Effect Style",
"Social Media Icon Set Style",
"Soft Pastel Portraits Style",
"Solar Illumination Style",
"Southwestern Desert Style",
"Spiritual Symbolism Style",
"Stamp Style",
"Steam Engine Style",
"Steam Funk Style",
"Stencil Wars Style",
"Storyboard Style",
"Superhero Comics Style",
"Suspended Animation Style",
"Symbolic Tattoos Style",
"Tempestuous Seas Style",
"Tropical Monsoon Style",
"Turquoise Watercolor Style",
"Underwater Fantasy Style",
"Urban Abstract Style",
"Urban Bohemia Style",
"Urban Fantasy Style",
"Vaporwave Aesthetic Style",
"Victorian Era Style",
"Victorian Science Style",
"Viking Mythology Style",
"Vintage Advertising Style",
"Vintage Circus Style",
"Vintage Obscura Style",
"Vintage Poster Style",
"Vivid Imagination Style",
"Wanderlust Aesthetic Style",
"Watercolor and Ink Style",
"Wild West Style",
"Wilderness Adventures Style",
"Wildflower Dreams Style",
"Witchy Vibes Style",
"Woodcut Illustration Style",
"Yarn and Threads Style",
"Zen Mandalas Style",
    ];
    options1.forEach(optionText => {
        const option = document.createElement("option");
        option.textContent = optionText;
        select1.appendChild(option);
    });
    selectContainer.appendChild(select1);

    // Create the search box
    const searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.id = "searchBox"; // Add ID for easy access
    searchBox.placeholder = "Search...";
    searchBox.style.display = "none"; // Initially hidden
    selectContainer.appendChild(searchBox);
}

// Function to update the displayed image
function updateImage() {
    const select = document.querySelector(".style-select"); // Get the select element
    const selectedValue = select.value; // Get the selected value
    const imageContainer = document.getElementById("imageContainer"); // Get the image container

    // Use the global images object to get the image source
    if (images[selectedValue]) {
        imageContainer.innerHTML = `
            <div class="imageContainer">
                <img alt="${selectedValue} image" class="rounded-md" height="300" src="${images[selectedValue]}" width="300"/>
            </div>
        `;
    } else {
        imageContainer.innerHTML = ''; // Clear the image if no valid selection
    }
}

// Function to update the displayed text
function updateText() {
    const inputText = document.getElementById("dogInput").value; // Get the input text
    const select = document.querySelector(".style-select"); // Get the select element
    const selectedValue = select.value; // Get the selected value
    const dynamicTextElement = document.getElementById("dynamicText");

    // Update the dynamic text based on the input and selected value
    dynamicTextElement.innerText = inputText || prompts[selectedValue] || "prompt"; // Use input text or prompt

    // If the selected value is valid, append the prompt
    if (prompts[selectedValue]) {
        dynamicTextElement.innerText += " - " + prompts[selectedValue];
    }
}

// Function to copy text to clipboard
function copyToClipboard() {
    const textToCopy = document.getElementById("copyText").innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Text copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

// Function to create a checkbox and select pair
function createCheckboxSelect(checkboxId, options) {
    const outerDiv = document.createElement('div');
    outerDiv.className = 'mt-2';

    const flexContainer = document.createElement('div');
    flexContainer.className = 'flex items-center space-x-2';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-checkbox';
    checkbox.id = checkboxId;

    const select = document.createElement('select');
    select.className = 'style-select w-full';

    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        select.appendChild(option);
    });

    flexContainer.appendChild(checkbox);
    flexContainer.appendChild(select);
    outerDiv.appendChild(flexContainer);

    return outerDiv;
}

// Function to generate the table
function createTable() {
    const data = [
        {
            styleName: "None",
            imageSrc: "images/xjrKrAM_H3LEAK4wadJLV30ILMgXn1DDFCJpWIHXx-k.jpg",
            prompt: "A Young Asian Woman"
        },
        {
            styleName: "cinematic-default",
            imageSrc: "images/ZDhM6kRZUnyZaa6X1kgEGtBmJfQ-oFqvkmzJMoXiv_o.jpg",
            prompt: "cinematic still, emotional, harmonious, vignette, highly detailed, high budget, bokeh, cinemascope, moody, epic, gorgeous, film grain, grainy"
        },
        {
            styleName: "3d-model",
            imageSrc: "images/nrVRKiSvD-_xHo8Yyr_2ipAh2DSbsA8O4sU3TZ7oTO4.jpg",
            prompt: "3d model, octane render, highly detailed, volumetric, dramatic lighting"
        },
        {
            styleName: "analog film",
            imageSrc: "images/U-gBmQdVO7Rwmn029aU8Ev6r1-bp565eNR3Xl45lgEs.jpg",
            prompt: "analog film photo, faded film, desaturated, 35mm photo, grainy, vignette, vintage, Kodachrome, Lomography, stained, highly detailed, found footage"
        },
        {
            styleName: "anime",
            imageSrc: "images/0TVzOPMfPeadQSauWCCMgQYG9FmbwMYh7P6opo9awyM.jpg",
            prompt: "anime, highly detailed, colorful, expressive, stylized, vibrant"
        },
        {
            styleName: "cinematic",
            imageSrc: "images/7nEd5tgm3Lko4w7sLP9lECaQe4vjIGggiv130euppss.jpg",
            prompt: "cinematic film still, shallow depth of field, vignette, highly detailed, high budget, bokeh, cinemascope, moody, epic, gorgeous, film grain, grainy"
        },
        {
            styleName: "comic book",
            imageSrc: "images/GcjAT80iScPXGXNrVpXp3k-9NGrH83IXJgXKoJaPevc.jpg",
            prompt: "comic, graphic illustration, comic art, graphic novel art, vibrant, highly detailed"
        },
        {
            styleName: "craft clay",
            imageSrc: "images/XLBkIy5fCSbA-UV1rxN9SclCOCQV0P8AD4OwdN3Qq8E.jpg",
            prompt: "play-doh style, sculpture, clay art, centered composition, Claymation"
        },
        {
            styleName: "digital art",
            imageSrc: "images/PGVhYeJjJ_DxDOiD2vbIW4ygPsrw8S-_Hp0i31csQAA.jpg",
            prompt: "concept art, digital artwork, illustrative, painterly, matte painting, highly detailed"
        },
        {
            styleName: "enhance",
            imageSrc: "images/DlZn6a1CeLrpAwXuss9NOG2kd5XuHkukiDyeFKwPaUE.jpg",
            prompt: "breathtaking, award-winning, professional, highly detailed"
        },
        {
            styleName: "fantasy art",
            imageSrc: "images/imGkOmlkDqX5qXuyuvY70cH7WCl4zZWNhO4zA5DhM3E.jpg",
            prompt: "ethereal fantasy concept art of, magnificent, celestial, ethereal, painterly, epic, majestic, magical, fantasy art, cover art, dreamy"
        },
        {
            styleName: "isometric",
            imageSrc: "images/FHLYYY7eU2hsrdX_fraDYvPE-Qy9IrSJBgLUvexZFPw.jpg",
            prompt: "isometric style, vibrant, beautiful, crisp, detailed, ultra detailed, intricate"
        },
        {
            styleName: "line art",
            imageSrc: "images/_9JxQYNereSc1w3ZtizGj1Xjb2Yrso1H1ff4cFxcNAQ.jpg",
            prompt: "line art drawing, professional, sleek, modern, minimalist, graphic, line art, vector graphics"
        },
        {
            styleName: "lowpoly",
            imageSrc: "images/Ci4PUB9U7AQcX8QWZyk6UbD5mghuAzI6tJPA9UeE15A.jpg",
            prompt: "low-poly style, low-poly game art, polygon mesh, jagged, blocky, wireframe edges, centered composition"
        },
        {
            styleName: "neonpunk",
            imageSrc: "images/K7apGEkZPJKih9x6Dt50cljPLv6MpguVX84i_IVfXoQ.jpg",
            prompt: "neon punk style, cyberpunk, vaporwave, neon, vibes, vibrant, stunningly beautiful, crisp, detailed, sleek, ultramodern, magenta highlights, dark purple shadows, high contrast, cinematic, ultra detailed, intricate, professional"
        },
        {
            styleName: "origami",
            imageSrc: "images/9tkFD5IbWngcw_P-Ho1pMbRB4vbsOiWopmf7U7L6c1U.jpg",
            prompt: "origami style, paper art, pleated paper, folded, origami art, pleats, cut and fold, centered composition"
        },
        {
            styleName: "photographic",
            imageSrc: "images/ybRi9QcWetCFswnMJa9gIlETSPbSKndEH3lw8TtbpAQ.jpg",
            prompt: "cinematic photo, 35mm photograph, film, bokeh, professional, 4k, highly detailed"
        },
        {
            styleName: "pixel art",
            imageSrc: "images/q8epYoBXj8oyGmjG8BVTvE2Skvk5kga1s8oY6h57ji8.jpg",
            prompt: "pixel-art, low-res, blocky, pixel art style, 8-bit graphics"
        },
        {
            styleName: "texture",
            imageSrc: "images/n1aJqU_OABGpu_oUxncIocpsnYIv2FqUrxXXmP7GHxI.jpg",
            prompt: "texture top-down close-up"
        },
        {
            styleName: "ads-advertising",
            imageSrc: "images/ymqjaxtkzAjwSmirH1PTpKO3Ch5NTqiqAUFoCxDKRz8.jpg",
            prompt: "Advertising poster style, Professional, modern, product-focused, commercial, eye-catching, highly detailed"
        },
        {
            styleName: "ads-automotive",
            imageSrc: "images/L8LvdMIlZixH6RC8h-kf5ipnCzuSBRsfdZcvrS1J0cQ.jpg",
            prompt: "Automotive advertisement style, Sleek, dynamic, professional, commercial, vehicle-focused, high-resolution, highly detailed"
        },
        {
            styleName: "ads-corporate",
            imageSrc: "images/LfGvRpJ2Ak8x5FI5huVWVeaPuq2dpE5ncYsvkSXuPBY.jpg",
            prompt: "Corporate branding style, Professional, clean, modern, sleek, minimalist, business-oriented, highly detailed"
        },
        {
            styleName: "ads-fashion editorial",
            imageSrc: "images/VteJ9FSWBA0ioHXMDwwiFUno_Z8HRYdVY75SVaEq6Ps.jpg",
            prompt: "Fashion editorial style, High fashion, trendy, stylish, editorial, magazine style, professional, highly detailed"
        },
        {
            styleName: "ads-food photography",
            imageSrc: "images/T4etsPwWCV3tXH4wIzxs5jl2LOyH2T1zudCqdxROU_8.jpg",
            prompt: "Food photography style {Animal}. Appetizing, professional, culinary, high-resolution, commercial, highly detailed"
        },
        {
            styleName: "ads-luxury",
            imageSrc: "images/pB06TWdAAMt0nE8kqTtE8ksSejz9n8g5eaI4TXBklEY.jpg",
            prompt: "Luxury product style {Animal}. Elegant, sophisticated, high-end, luxurious, professional, highly detailed"
        },
        {
            styleName: "ads-real estate",
            imageSrc: "images/I355XTqVjLbmxfpBpVHw4p_gyhaEcaYndSoq1DbN1yM.jpg",
            prompt: "Real estate photography style {Animal}. Professional, inviting, well-lit, high-resolution, property-focused, commercial, highly detailed"
        },
        {
            styleName: "ads-retail",
            imageSrc: "images/rf8UxUa-VWURV1pv_ys2jjkaHxwvv-t7DFP27kn0jX0.jpg",
            prompt: "Retail packaging style {Animal}. Vibrant, enticing, commercial, product-focused, eye-catching, professional, highly detailed"
        },
        {
            styleName: "artstyle-abstract",
            imageSrc: "images/q3p2tx8_u7A8QklHE7JaEyfdXbvLj1kRwOrfW-ESLtc.jpg",
            prompt: "abstract style {Animal}. non-representational, colors and shapes, expression of feelings, imaginative, highly detailed"
        },
        {
            styleName: "artstyle-abstract expressionism",
            imageSrc: "images/PDChfr2PfJmPIfMmARNfsFv0uaK2bWV-rMixqoov2PQ.jpg",
            prompt: "abstract expressionist painting {Animal}. energetic brushwork, bold colors, abstract forms, expressive, emotional"
        },
        {
            styleName: "artstyle-art deco",
            imageSrc: "images/z_N6puDHC28tQ-dylRqcup6dKvFV9zodBHEsyrnX04U.jpg",
            prompt: "Art Deco style {Animal}. geometric shapes, bold colors, luxurious, elegant, decorative, symmetrical, ornate, detailed"
        },
        {
            styleName: "artstyle-art nouveau",
            imageSrc: "images/SJB7O8mL7m6JAzJiEWkwz4kVmk3y72i8b-mKZEESRyg.jpg",
            prompt: "Art Nouveau style {Animal}. elegant, decorative, curvilinear forms, nature-inspired, ornate, detailed"
        },
        {
            styleName: "artstyle-constructivist",
            imageSrc: "images/G7zSnSwiTG8DUyWrIZt-ZNYoFSOtWjxX8MerDQROj6g.jpg",
            prompt: "constructivist style {Animal}. geometric shapes, bold colors, dynamic composition, propaganda art style"
        },
        {
            styleName: "artstyle-cubist",
            imageSrc: "images/JhmP77SO0-3eQe7v0rPNuWTObRAMdLVgTuA3chvU33s.jpg",
            prompt: "cubist artwork {Animal}. geometric shapes, abstract, innovative, revolutionary"
        },
        {
            styleName: "artstyle-expressionist",
            imageSrc: "images/HUExvWqFYA__qPB2T7WDKX031qqtoY2Y59B985KoASM.jpg",
            prompt: "expressionist style {Animal}. raw, emotional, dynamic, distortion for emotional effect, vibrant, use of unusual colors, detailed"
        },
        {
            styleName: "artstyle-graffiti",
            imageSrc: "images/9uuvF2VryrycpKSPrFf2FolJDXM-Npd-P4TCYWepGRE.jpg",
            prompt: "graffiti style {Animal}. street art, vibrant , urban, detailed, tag, mural"
        },
        {
            styleName: "ads-fashion editorial",
            imageSrc: "images/VteJ9FSWBA0ioHXMDwwiFUno_Z8HRYdVY75SVaEq6Ps.jpg",
            prompt: "Fashion editorial style {Animal}. Stylish, modern, high-fashion, editorial, professional, highly detailed"
        },
        {
            styleName: "artstyle-hyperrealism",
            imageSrc: "images/Z-2P3AiNoBA1a1fxyBOXCc9RTkWyu26UgFrr8nGh23I.jpg",
            prompt: "hyper realistic art, extremely high-resolution details, photographic, realism pushed to extreme, fine texture, incredibly lifelike"
        },
        {
            styleName: "artstyle-impressionist",
            imageSrc: "images/XIqxMCnKJM9EvXzgJBFKsXHJnXs-zGbzblFr65lLFoo.jpg",
            prompt: "impressionist painting, loose brushwork, vibrant color, light and shadow play, captures feeling over form"
        },
        {
            styleName: "artstyle-pointillism",
            imageSrc: "images/a4ODFvq9puNoUf3ty79NQKXQ9wXBhOtpGKKjLwIV_C8.jpg",
            prompt: "pointillism style, composed entirely of small, distinct dots of color, vibrant, highly detailed"
        },
        {
            styleName: "artstyle-pop art",
            imageSrc: "images/95KcYqC0grIAJrTmFBKAfyddWiSLVNvrbHHBIolJowc.jpg",
            prompt: "Pop Art style, bright colors, bold outlines, popular culture themes, ironic or kitsch"
        },
        {
            styleName: "artstyle-psychedelic",
            imageSrc: "images/0fUQvoexT5KSIoBXXVIj-pumSaE_5Xg4fDjKGpr9alA.jpg",
            prompt: "psychedelic style, vibrant colors, swirling patterns, abstract forms, surreal, trippy"
        },
        {
            styleName: "artstyle-renaissance",
            imageSrc: "images/iPUpcZlewdETEaqLR7Bu7qiONrj15zAxyDt1kIZk4XY.jpg",
            prompt: "Renaissance style, realistic, perspective, light and shadow, religious or mythological themes, highly detailed"
        },
        {
            styleName: "artstyle-steampunk",
            imageSrc: "images/yKJ5S4vJby0qweu4dC_zwi-oyiA31Ogxys_B8Be-FfI.jpg",
            prompt: "steampunk style, antique, mechanical, brass and copper tones, gears, intricate, detailed"
        },
        {
            styleName: "artstyle-surrealist",
            imageSrc: "images/rNO38cadMMHc-iFb913jrG7gCGXSEH6stsCJGDokUbg.jpg",
            prompt: "surrealist art, dreamlike, mysterious, provocative, symbolic, intricate, detailed"
        },
        {
            styleName: "artstyle-typography",
            imageSrc: "images/MguhGHS7y2KwJibJP3DAGpYxQ7h5BOPu1h7XZGAefbg.jpg",
            prompt: "typographic art, stylized, intricate, detailed, artistic, text-based"
        },
        {
            styleName: "artstyle-watercolor",
            imageSrc: "images/QgMRYvTbvP1PR27m87a6-N-XA9D1FhZGVWOrR7uA5U8.jpg",
            prompt: "watercolor painting, vibrant, beautiful, painterly, detailed, textural, artistic"
        },
        {
            styleName: "futuristic-biomechanical",
            imageSrc: "images/TcSl8Z5cUCoq6upSJdmExCE5q7s90BxyUai-yLoX464.jpg",
            prompt: "biomechanical style, blend of organic and mechanical elements, futuristic, cybernetic, detailed, intricate"
        },
        {
            styleName: "futuristic-biomechanical cyberpunk",
            imageSrc: "images/TaykA0Od1WDkaXz_mI98A3vdM84UinrBZOz9uMqfx2s.jpg",
            prompt: "biomechanical cyberpunk, cybernetics, human-machine fusion, dystopian, organic meets artificial, dark, intricate, highly detailed"
        },
        {
            styleName: "futuristic-cybernetic",
                imageSrc: "images/zMUFyf3pQrki3uHiTzzVxmf4UKhIGkFDtJq3CBpoYoA.jpg",
                prompt: "cybernetic style. futuristic, technological, cybernetic enhancements, robotics, artificial intelligence themes"
            },
            {
                styleName: "futuristic-cybernetic robot",
                imageSrc: "images/OYUS6skSdLJQhKZiyjGotZKtDYPO7-hI4WzQ7ycyDDM.jpg",
                prompt: "cybernetic robot. android, AI, machine, metal, wires, tech, futuristic, highly detailed"
            },
            {
                styleName: "futuristic-cyberpunk cityscape",
                imageSrc: "images/ordyT87bqw3lkEIEIa30TljHRdEskbVaYTxNoFFotl0.jpg",
                prompt: "cyberpunk cityscape. neon lights, dark alleys, skyscrapers, futuristic, vibrant colors, high contrast, highly detailed"
            },
            {
                styleName: "futuristic-futuristic",
                imageSrc: "images/gprnDXuxgFCYHli297XJ-4hEVipnpCfIWzsgfxCU3Ic.jpg",
                prompt: "futuristic style. sleek, modern, ultramodern, high tech, detailed"
            },
            {
                styleName: "futuristic-retro cyberpunk",
                imageSrc: "images/pLMALty3kYiOJBVz8GtwRWjDQqQvN7q8GPNXYmj6340.jpg",
                prompt: "retro cyberpunk. 80's inspired, synthwave, neon, vibrant, detailed, retro futurism"
            },
            {
                styleName: "futuristic-retro futurism",
                imageSrc: "images/vw8wpW1ajRwhZUZH_QyPxJBQtfFnDnkZMfFOWGHj-DQ.jpg",
                prompt: "retro-futuristic. vintage sci-fi, 50s and 60s style, atomic age, vibrant, highly detailed"
            },
            {
                styleName: "futuristic-sci-fi",
                imageSrc: "images/BgHmRbOypnQaPY73wnVVzjkwHkignCyQIZp1R4x0mRg.jpg",
                prompt: "sci-fi style. futuristic, technological, alien worlds, space themes, advanced civilizations"
            },
            {
                styleName: "futuristic-vaporwave",
                imageSrc: "images/eay_Zs5MjeK1ACh7KizxcHuZPLfgHMol5qSvix3Pvrw.jpg",
                prompt: "vaporwave style. retro aesthetic, cyberpunk, vibrant, neon colors, vintage 80s and 90s style, highly detailed"
            },
            {
                styleName: "game-bubble bobble",
                imageSrc: "images/c-rRJ7CEvWMwQxiVj7Gxp3CWOXM_VENQcuQfXOIhbTE.jpg",
                prompt: "Bubble Bobble style. 8-bit, cute, pixelated, fantasy, vibrant, reminiscent of Bubble Bobble game"
            },
            {
                styleName: "game-cyberpunk game",
                imageSrc: "images/kVdw0_oG6CyHNGPi_H5JdUK5_Wam22ppqmMGDw1F7w0.jpg",
                prompt: "cyberpunk game style. neon, dystopian, futuristic, digital, vibrant, detailed, high contrast, reminiscent of cyberpunk genre video games"
            },
            {
                styleName: "game-fighting game",
                imageSrc: "images/YZVU8MURCLLbgwI158XraAlCiE7Q7cFycNAiaNw0O_Q.jpg",
                prompt: "fighting game style. dynamic, vibrant, action-packed, detailed character design, reminiscent of fighting video games"
            },
            {
                styleName: "game-gta",
                imageSrc: "images/szgeVQqzjEpOWqX8xIw_U5Fj5E0wjxmYAY2LB0Q-o68.jpg",
                prompt: "GTA-style artwork. satirical, exaggerated, pop art style, vibrant colors, iconic characters, action-packed"
            },
            {
                styleName: "game-mario",
                imageSrc: "images/j6jt470BdpVRfJp0ZIVqOxqs_NeETkHaBy8h9KRy6Wk.jpg",
                prompt: "Super Mario style. vibrant, cute, cartoon, fantasy, playful, reminiscent of Super Mario series"
            },
            {
                styleName: "game-minecraft",
                imageSrc: "images/L8Gqhqc8mchYOJ831CpM9B8rYh8PK8SWzFvrOQx7p0I.jpg",
                prompt: "Minecraft style. blocky, pixelated, vibrant colors, recognizable characters and objects, game assets"
            },
            {
                styleName: "game-minecraft",
                imageSrc: "images/yO0Lj4bMcUwoMu42gobaWpYkCGbcXLubT6gCNhnVI3A.jpg",
                prompt: "Minecraft style. blocky, pixelated, vibrant colors, recognizable characters and objects, game assets"
            },
            {
                styleName: "game-pokemon",
                imageSrc: "images/Yx_CdHPWI81EGsQZU2eCHNoYiuHBtfejB7MUuhBdmmQ.jpg",
                prompt: "Pokemon style. vibrant, cute, anime, fantasy, reminiscent of Pokemon series"
            },
            {
                styleName: "game-retro arcade",
                imageSrc: "images/kTBoSqObOCwscJ5SYIx_FngscyVvz9E0eRrED3i2rf8.jpg",
                prompt: "retro arcade style. 8-bit, pixelated, vibrant, classic video game, old school gaming, reminiscent of 80s and 90s arcade games"
            },
            {
                styleName: "game-retro game",
                imageSrc: "images/12n6yXQEWAW7u78ZVnf5UMR3gHT-14dy5zvhAOkzl7M.jpg",
                prompt: "retro game art. 16-bit, vibrant colors, pixelated, nostalgic, charming, fun"
            },
            {
                styleName: "game-rpg fantasy game",
                imageSrc: "images/TqbB29ytKmSUgBcCoZK5QoV0jP2EvjRU_fwFxmKZiVA.jpg",
                prompt: "role-playing game (RPG) style fantasy. detailed, vibrant, immersive, reminiscent of high fantasy RPG games"
            },
            {
                styleName: "game-strategy game",
                imageSrc: "images/ad8MIK7KEQ42JfUjOxElNgYvJmmFGtU4xjExhxPOZeE.jpg",
                prompt: "strategy game style. overhead view, detailed map, units, reminiscent of real-time strategy video games"
            },
            {
                styleName: "game-streetfighter",
                imageSrc: "images/ylp_y9XXfDBNItvibBeaH3M2X8XOBNepUr262ijmAbg.jpg",
                prompt: "Street Fighter style. vibrant, dynamic, arcade, 2D fighting game, highly detailed, reminiscent of Street Fighter series"
            },
            {
                styleName: "game-zelda",
                imageSrc: "images/CJaPp1ZajYJNaV0y65FsAuWwghsfqK4y8e_pOgV1okM.jpg",
                prompt: "Legend of Zelda style. vibrant, fantasy, detailed, epic, heroic, reminiscent of The Legend of Zelda series"
            },
            {
                styleName: "misc-architectural",
                imageSrc: "images/SajOBeRa7Cm84LFU9UUnMmn8ijn18yAmXZvPhNGc2xM.jpg",
                prompt: "architectural style. clean lines, geometric shapes, minimalist, modern, architectural drawing, highly detailed"
            },
            {
                styleName: "misc-disco",
                imageSrc: "images/mY_bun9D26pfIw5Zx8xmxQDgZgqgrTzbK2XUL7L0FjQ.jpg",
                prompt: "disco-themed. vibrant, groovy, retro 70s style, shiny disco balls, neon lights, dance floor, highly detailed"
            },
            {
                styleName: "misc-dreamscape",
                imageSrc: "images/pmY-UwWna8SJPEXMaXnFvc1RKmnZimLXygJjrudm_PM.jpg",
                prompt: "dreamscape. surreal, ethereal, dreamy, mysterious, fantasy, highly detailed"
            },
            {
                styleName: "misc-dystopian",
                imageSrc: "images/56TTKKA495AVbLSJ4K9LleyTN2RHeEkhVUe-Da1ASk0.jpg",
                prompt: "dystopian style. bleak, post-apocalyptic, somber, dramatic, highly detailed"
            },
            {
                styleName: "misc-fairy tale",
                imageSrc: "images/Ku7PcLcu3RsgAhJJfZeDEQ4ENQeCHM-Z_C2oUUWAwtw.jpg",
                prompt: "fairy tale. magical, fantastical, enchanting, storybook style, highly detailed"
            },
            {
                styleName: "misc-gothic",
                imageSrc: "images/O2G3hChxvfpTDLyV8-Pdnz4pZThBRIt1gXc7fATswGo.jpg",
                prompt: "gothic style. dark, mysterious, haunting, dramatic, ornate, detailed"
            },
            {
        styleName: "misc-grunge",
        imageSrc: "images/v88ezqOZ5gYpWRItyzy78vUvKvA7lJQhyPlEe0-cmiY.jpg",
        prompt: "grunge style. textured, distressed, vintage, edgy, punk rock vibe, dirty, noisy"
    },
    {
        styleName: "misc-horror",
        imageSrc: "images/7-ULVaitFXdkUNVXblPiL5qrdfAdgojHAMM4Hr_LkaE.jpg",
        prompt: "horror-themed. eerie, unsettling, dark, spooky, suspenseful, grim, highly detailed"
    },
    {
        styleName: "misc-kawaii",
        imageSrc: "images/LZLJpu9SOFUFB0mgLjXQeEeuVbkTdpKU2YyM6e7t7rI.jpg",
        prompt: "kawaii style. cute, adorable, brightly colored, cheerful, anime influence, highly detailed"
    },
    {
        styleName: "misc-lovecraftian",
        imageSrc: "images/dPZufSfLEeGuQ1XrmrqJ1BBkqszCHAqE7Q9iT6vOo-0.jpg",
        prompt: "lovecraftian horror. eldritch, cosmic horror, unknown, mysterious, surreal, highly detailed"
    },
    {
        styleName: "misc-macabre",
        imageSrc: "images/EsljKVmKQQ-q1EizsExtEjalyawjGQIbW8ncJf9JYIg.jpg",
        prompt: "macabre style. dark, gothic, grim, haunting, highly detailed"
    },
    {
        styleName: "misc-manga",
        imageSrc: "images/3ifqEpb7U0vNvTcRHAgNBa3n5s3Irzd_0T6MFo3mn4U.jpg",
        prompt: "manga style. vibrant, high-energy, detailed, iconic, Japanese comic style"
    },
    {
        styleName: "misc-metropolis",
        imageSrc: "images/dxzDgv2MEeG-E7Km89ngG3BmoPWjSRu5kF8NCR_SeKs.jpg",
        prompt: "metropolis-themed. urban, cityscape, skyscrapers, modern, futuristic, highly detailed"
    },
    {
        styleName: "misc-minimalist",
        imageSrc: "images/2MH5WS9wecYzKTF-8H5yfI7--DHblHeFsFxBjs-TKts.jpg",
        prompt: "minimalist style. simple, clean, uncluttered, modern, elegant"
    },
    {
        styleName: "misc-monochrome",
        imageSrc: "images/75E6granvpz5iDsqeIQ08z9m3UiiuelqhUE47AHO8H8.jpg",
        prompt: "monochrome. black and white, contrast, tone, texture, detailed"
    },
    {
        styleName: "misc-nautical",
        imageSrc: "images/pTFNP0I4oq1KfEUEEY9TXXLrn2vSbKwXZEVCBWQFmBg.jpg",
        prompt: "nautical-themed. sea, ocean, ships, maritime, beach, marine life, highly detailed"
    },
    {
        styleName: "misc-space",
        imageSrc: "images/RiKQUhdgZtiVyZMhQKLkhMfpv3a6mZ2IpPrEKCAzWaU.jpg",
        prompt: "space-themed. cosmic, celestial, stars, galaxies, nebulas, planets, science fiction, highly detailed"
    },
    {
        styleName: "misc-stained glass",
        imageSrc: "images/iEZwxRzkuZF5K1ruoLTQYpRYjmt0EEaGgm8RgeNU9Mw.jpg",
        prompt: "stained glass style. vibrant, beautiful, translucent, intricate, detailed"
    },
    {
        styleName: "misc-techwear fashion",
        imageSrc: "images/8OUtQXDtgC21PIq_FuZUcjW7aT0mT0ETz46HhI0rmuE.jpg",
        prompt: "techwear fashion. futuristic, cyberpunk, urban, tactical, sleek, dark, highly detailed"
    },
    {
        styleName: "misc-tribal",
        imageSrc: "images/BVYvhkGOZTk41MbrD6qX7UIIGwTNLYSXXeP2Njn7L0k.jpg",
        prompt: "tribal style. indigenous, ethnic, traditional patterns, bold, natural colors, highly detailed"
    },
    {
        styleName: "misc-zentangle",
        imageSrc: "images/UC4TpEeIaa532mpygsodttGj7EpqPnbiATxrVotnCGE.jpg",
        prompt: "zentangle. intricate, abstract, monochrome, patterns, meditative, highly detailed"
    },
    {
        styleName: "papercraft-collage",
        imageSrc: "images/1j-2pMTSPAz8Bmrp_0TujPWEy5QRE9di4VkmODDAkAI.jpg",
        prompt: "collage style. mixed media, layered, textural, detailed, artistic"
    },
    {
        styleName: "papercraft-flat papercut",
        imageSrc: "images/Ms5afk47rH9l2hoheLg7BIMm3PVVvJVMteZywlBC7bE.jpg",
        prompt: "flat papercut style. silhouette, clean cuts, paper, sharp edges, minimalist, color block"
    },
    {
        styleName: "papercraft-kirigami",
        imageSrc: "images/oqfan7tXMJdCmTdrl57O4ovaFQBegVi4DBOBTwCT7GI.jpg",
        prompt: "kirigami representation of. 3D, paper folding, paper cutting, Japanese, intricate, symmetrical, precision, clean lines"
    },
    {
        styleName: "papercraft-paper mache",
        imageSrc: "images/KS34r_4nOJJSvpt7roB6PXTaYC356ZSCFMgnaskfpaw.jpg",
        prompt: "paper mache representation of. 3D, sculptural, textured, handmade, vibrant, fun"
    },
    {
        styleName: "papercraft-paper quilling",
        imageSrc: "images/th06TanqD1Wt08Ke8ShxC2FPdFqb196CDpynrUzxftA.jpg",
        prompt: "paper quilling art of. intricate, delicate, curling, rolling, shaping, coiling, loops, 3D, dimensional, ornamental"
    },
    {
        styleName: "papercraft-papercut collage",
        imageSrc: "images/Xwjcb7CdIkKBPtIckuyBOnIRyt2LWJRHo4o5XH3UO08.jpg",
        prompt: "papercut collage of. mixed media, textured paper, overlapping, asymmetrical, abstract, vibrant"
    },
    {
        styleName: "papercraft-papercut shadow box",
        imageSrc: "images/hCByFMbG9W9692q8gLUAJTx5ibFZmBBclKw7wqXEF2g.jpg",
        prompt: "3D papercut shadow box of. layered, dimensional, depth, silhouette, shadow, papercut, handmade, high contrast"
    },
    {
        styleName: "papercraft-stacked papercut",
        imageSrc: "images/nOuccJDQlvW7P0CxqM644Gzbvx-P9ftLRj-nnlxPiZw.jpg",
        prompt: "stacked papercut art of. 3D, layered, dimensional, depth, precision cut, stacked layers, papercut, high contrast"
    },
    {
        styleName: "papercraft-thick layered papercut",
        imageSrc: "images/Hayfy4l3ifS8U9eUi1GoR4mY5yGYsK_1exMh8pl-ypA.jpg",
        prompt: "thick layered papercut art of. deep 3D, volumetric, dimensional, depth, thick paper, high stack, heavy texture, tangible layers"
    },
    {
        styleName: "photo-alien",
        imageSrc: "images/D2Ew1iYQFX_4Nx-M3DTQBZhjtv423zkG5SAUnqlpnaA.jpg",
        prompt: "alien-themed. extraterrestrial, cosmic, otherworldly, mysterious, sci-fi, highly detailed"
    },
    {
        styleName: "photo-film noir",
        imageSrc: "images/TBEbTpeLXh9Q-e-wQVAMb3-xihnFFn0WMZS2WcwcLS4.jpg",
        prompt: "film noir style. monochrome, high contrast, dramatic shadows, 1940s style, mysterious, cinematic"
    },
    {
        styleName: "photo-hdr",
        imageSrc: "images/9nubNdd0a9xnk36TnY3J_rlDsbMO3528cpayT48YRCU.jpg",
        prompt: "HDR photo of. high dynamic range, vivid, rich details, clear shadows and highlights, realistic, intense, enhanced contrast, highly detailed"
    },
    {
        styleName: "photo-long exposure",
        imageSrc: "images/fUKv0OX8WE_nUz92rBmpQA1MYMBgpmEaC07YfCAwlcU.jpg",
        prompt: "long exposure photo of. blurred motion, streaks of light, surreal, dreamy, ghosting effect, highly detailed"
    },
    {
        styleName: "photo-neon noir",
        imageSrc: "images/-ig6zt0zwrm2h8RCIxEGZT1G6rBjPmMJONBM38ohKVA.jpg",
        prompt: "neon noir cyberpunk, dark, rainy streets, neon signs, high contrast, low light, vibrant, highly detailed"
    },
    {
        styleName: "photo-silhouette",
        imageSrc: "images/zWDLlvLysMxOpidkTVAWvnffWqtSdF7Vd-_sG-9NJaM.jpg",
        prompt: "silhouette style high contrast, minimalistic, black and white, stark, dramatic"
    },
    {
        styleName: "photo-tilt-shift",
        imageSrc: "images/pxtUZIgJFt8LfdmrPL-RVOGz1LQo9HCfEAW7pSglU1E.jpg",
        prompt: "tilt-shift photo of selective focus, miniature effect, blurred background, highly detailed, vibrant, perspective control"
    },
    {
        styleName: "cinematic-diva",
        imageSrc: "images/bHMjm6xjHo94JEi0myRQ9StGR2k7zgUbyT6PpGsP5HI.jpg",
        prompt: "UHD, 8K, ultra detailed, a cinematic photograph of beautiful lighting, great composition"
    },
    {
        styleName: "Abstract Expressionism",
        imageSrc: "images/3C4T-CnFo1XlMlkFwmDXyKK_jBeyh8-CX8s8bzzMMF0.jpg",
        prompt: "Abstract Expressionism Art, high contrast, minimalistic, colorful, stark, dramatic, expressionism"
    },
    {
        styleName: "Academia",
        imageSrc: "images/sUuspuqyqnHdW7i-Uz2w4NOO8v4Q0W1lJADpivl2I3o.jpg",
        prompt: "Academia, preppy Ivy League style, stark, dramatic, chic boarding school, academia"
    },
    {
        styleName: "Action Figure",
        imageSrc: "images/xVHY_6sLIPCxOoISpciwTflMP4HzUoBs_PBNLBq3BdU.jpg",
        prompt: "Action Figure, plastic collectable action figure, collectable toy action figure"
    },
    {
        styleName: "Adorable 3D Character",
        imageSrc: "images/9ZNYr1zOro2Dq67_qDTk31y_qYLKsEqFPZr4QbR7TIM.jpg",
        prompt: "Adorable 3D Character, 3D render, adorable character, 3D art"
    },
    {
        styleName: "Adorable Kawaii",
        imageSrc: "images/4vuxCRsKay-Lk7lQ6jms1fW-BhfbFhsGMDE7CukVzds.jpg",
        prompt: "Adorable Kawaii, pretty, cute, adorable, kawaii"
    },
    {
        styleName: "Art Deco",
        imageSrc: "images/vP14DFutQI85JkqJutlEivCap7ZBIvSKOB3-dW5zECE.jpg",
        prompt: "Art Deco, sleek, geometric forms, art deco style"
    },
    {
        styleName: "Art Nouveau",
        imageSrc: "images/XcIDnXjIuCIaGN46HWAFrLhdvtoO0ph-M0fGyNWzM-Y.jpg",
        prompt: "Art Nouveau, beautiful art, sleek, organic forms, long, sinuous, art nouveau style"
    },
    {
        styleName: "Astral Aura",
        imageSrc: "images/drLLyLwj19Pql1HZFpIYIpf9O8W1Uzey_m2aa9dC-y4.jpg",
        prompt: "Astral Aura, astral, colorful aura, vibrant energy"
    },
    {
        styleName: "Avant-garde",
        imageSrc: "images/v4FkRX3TGSBzntjnR4Mut1NXYpB4UbKQMKSomtlnxaM.jpg",
        prompt: "Avant-garde, unusual, experimental, avant-garde art"
    },
    {
        styleName: "Baroque",
        imageSrc: "images/o9M2lqxIoT1snYWSh7L9DAZpyNgYdKNuAIurRpZTF40.jpg",
        prompt: "Baroque, dramatic, exuberant, grandeur, baroque art"
    },
    {
        styleName: "Bauhaus-Style Poster",
        imageSrc: "images/t5T2TLix5sr_u4NaiYe4nZY7ESQrDhb8HEN8WatK1xk.jpg",
        prompt: "Bauhaus-Style Poster, simple geometric shapes, clean lines, primary colors"
    },
    {
        styleName: "Blueprint Schematic Drawing",
        imageSrc: "images/EoTk4W5gKGqq73RzCr9eyenlH044epmIMRZMFnKRoCE.jpg",
        prompt: "Blueprint Schematic Drawing, technical drawing, blueprint, schematic"
    },
    {
        styleName: "Caricature",
        imageSrc: "images/rW3mlvoKKp4wawZ-M9j-B1zNwtO7pkExUwd1NpOQjTs.jpg",
        prompt: "Caricature, exaggerated, comical, caricature"
    },
    {
        styleName: "Cel Shaded Art",
        imageSrc: "images/UWviNCtwtGcuduocENFBx6ED07zlXiJoLpMkMvyY9aY.jpg",
        prompt: "Cel Shaded Art, 2D, flat color, toon shading, cel shaded style"
    },
    {
        styleName: "Character Design Sheet",
        imageSrc: "images/HpaLFh3zqmFo_hEfgXi3e8asRoPb5esTgXpJIKBCIX0.jpg",
        prompt: "Character Design Sheet, character reference sheet, character turn around"
    },
    {
        styleName: "Classicism Art",
        imageSrc: "images/3IY0RNaXDup9yhcKfL3ntO2FIAKBaXKz6N_eZb982PA.jpg",
        prompt: "Classicism Art, inspired by Roman and Greek culture, clarity, harmonious, classicism art"
    },
    {
        styleName: "Color Field Painting",
        imageSrc: "images/eXk19pjxsGhk7U6syxQqd3vvQDpUjrZcs0BVIl9oOyQ.jpg",
        prompt: "Color Field Painting, abstract, simple, geometric, color field painting style"
    },
    {
        styleName: "Colored Pencil Art",
        imageSrc: "images/ia2zijEW1HIaKoMOWmNOmgiVdeNcktUhV42edFROZes.jpg",
        prompt: "Colored Pencil Art, colored pencil strokes, light color, visible paper texture, colored pencil art, and art supplies resting above the paper."
    },
    {
        styleName: "Conceptual Art",
        imageSrc: "images/sqIA1Oq795CaRbmCjss8HpZU9D02NBQETIQqqxU5Kgc.jpg",
        prompt: "Conceptual Art, concept art"
    },
    {
        styleName: "Constructivism",
        imageSrc: "images/58j3txNz6zBaWmIbFch3zSuoMfgYKe5cEqkHcoeFH4o.jpg",
        prompt: "Constructivism Art, minimalistic, geometric forms, constructivism art"
    },
    {
        styleName: "Cubism",
        imageSrc: "images/WnfB7hocaVJqOZIyLSYUyqsUKiQG9m-T1OSh1ZlURtM.jpg",
        prompt: "Cubism Art, flat geometric forms, cubism art"
    },
    {
        styleName: "Dadaism",
        imageSrc: "images/DvAWb_N5pW4WEgjIpfy2AZADJscLdFz6j2eKOpXgxIA.jpg",
        prompt: "Dadaism Art, satirical, nonsensical, dadaism art"
    },
    {
        styleName: "Dark Fantasy",
        imageSrc: "images/VrJKLMzK3xgCj8Jwpwv7bdUTdlVH49yoOq9SgwwW5c0.jpg",
        prompt: "Dark Fantasy Art, dark, moody, dark fantasy style"
    },
    {
        styleName: "Dark Moody Atmosphere",
        imageSrc: "images/Ev8x97Zi1oPrA9YiF6e1ji0JZH1RIhOSuQT0FK8WfGk.jpg",
        prompt: "Dark Moody Atmosphere, dramatic, mysterious, dark moody atmosphere"
    },
    {
        styleName: "DMT Art Style",
        imageSrc: "images/m6x0X3K_CFox12WZK6JIavq9PNdK-zDxf9pSJfNhmfY.jpg",
        prompt: "DMT Art Style, bright colors, surreal visuals, swirling patterns, DMT art style"
    },
    {
        styleName: "Doodle Art",
        imageSrc: "images/p7SYNwT0RoE3ahbqn8EsjclYcDTywBKB7Q2ZlcWbzOU.jpg",
        prompt: "Doodle Art Style, drawing, freeform, swirling patterns, doodle art style"
    },
    {
        styleName: "Double Exposure",
        imageSrc: "images/IPWHowoUGp9sbFBrtoI37SCxbmcGfJmMhthcu4nRMqA.jpg",
        prompt: "Double Exposure Style, double image ghost effect, image combination, double exposure style"
    },
    {
        styleName: "Dripping Paint Splatter Art",
        imageSrc: "images/BkScRkENBN4vO1oTBYJTN-5KBcLANHYzhLv2JhFFmWs.jpg",
        prompt: "Dripping Paint Splatter Art, dramatic, paint drips, splatters, dripping paint"
    },
    {
        styleName: "Expressionism",
        imageSrc: "images/T2qrrRbwUegXTsDcEeFpsgoJygxTq5LEiUKJSTnf8U8.jpg",
        prompt: "Expressionism Art Style, movement, contrast, emotional, exaggerated forms, expressionism art style"
    },
    {
        styleName: "Faded Polaroid Photo",
        imageSrc: "images/So1MXE5ZzEXbu0QvRqQG_z7KkgzTDT9dKb1kcQTcTKA.jpg",
        prompt: "Faded Polaroid Photo, analog, old, faded photo, old polaroid"
    },
    {
        styleName: "Fauvism",
        imageSrc: "images/DkmAKhWrruTVkixLUB1Bj41UAmdMmxveQXcLYN0RzkE.jpg",
        prompt: "Fauvism Art, painterly, bold colors, textured brushwork, fauvism art"
    },
    {
        styleName: "Flat 2D Art",
        imageSrc: "images/OTCCuAkTYYRCOnzKm-HBgtA0zhEiXFs_mF62bZ0Ro3E.jpg",
        prompt: "Flat 2D Art, simple flat color, 2-dimensional, Flat 2D Art Style"
    },
    {
        styleName: "Fortnite Art Style",
        imageSrc: "images/Z0LW_0pXNnpzx_SQlQV26Ror3-vCJvxjHxzID97cnzE.jpg",
        prompt: "Fortnite Art Style, 3D cartoon, colorful, Fortnite Art Style"
    },
    {
        styleName: "Futurism",
        imageSrc: "images/Gjkg6vYkYXHznagygC_noBW16e8zGsYYmWr3keGnc5s.jpg",
        prompt: "Futurism Art Style, dynamic, dramatic, Futurism Art Style"
    },
    {
        styleName: "Glitchcore",
        imageSrc: "images/DtKvS0ZLcxBakd10SlDB4LLAmsLO2B-SSa5TWkzW39M.jpg",
        prompt: "Glitchcore Art Style, dynamic, dramatic, distorted, vibrant colors, glitchcore art style"
    },
    {
        styleName: "Glo-fi",
        imageSrc: "images/m75f5pWeOlZtOEYJGY7gHqdfTx3NAPQAHtoPz9ZCH-I.jpg",
        prompt: "Glo-fi Art Style, dynamic, dramatic, vibrant colors, glo-fi art style"
    },
    {
        styleName: "Googie Art Style",
        imageSrc: "images/FfetjHhSR-sdk6dmRtFH0j8r0OlTyfYg4EvQzEyD1kI.jpg",
        prompt: "Googie Art Style, dynamic, dramatic, 1950's futurism, bold boomerang angles, Googie art style"
    },
    {
        styleName: "Graffiti Art",
        imageSrc: "images/Q5Wi5SX8I0dbrYgLVBORkjaMNSHOH7cyDqHJJ8qcC-Y.jpg",
        prompt: "Graffiti Art Style, dynamic, dramatic, vibrant colors, graffiti art style"
    },
    {
        styleName: "Harlem Renaissance Art",
        imageSrc: "images/g7KZ0iWHMOw5AoGqqMD-Vk8Nw1hDM1c_BiOcxfVgGTY.jpg",
        prompt: "Harlem Renaissance Art Style, dynamic, dramatic, 1920s African American culture, Harlem Renaissance art style"
    },
    {
        styleName: "High Fashion",
        imageSrc: "images/s1Pc8l9phxOfAX3GJTwfGjP-Fwk9a1HeZ5-zALkhZHY.jpg",
        prompt: "High Fashion, dynamic, dramatic, haute couture, elegant, ornate clothing, High Fashion"
    },
    {
        styleName: "Idyllic",
        imageSrc: "images/Lj1B0npdho2QytLY-44Ql43NJWa4PxUuvQZf3CWkztI.jpg",
        prompt: "Idyllic, peaceful, happy, pleasant, happy, harmonious, picturesque, charming"
    },
    {
        styleName: "Impressionism",
        imageSrc: "images/x14-Up8o7c00YiLFJIxa_shoQ__MUfkHHe8nTYrLL4o.jpg",
        prompt: "Impressionism, painterly, small brushstrokes, visible brushstrokes, impressionistic style"
    },
    {
        styleName: "Infographic Drawing",
        imageSrc: "images/UwdiIzE2SiavGKBfE3cLZJKQeFgS2c_r0dRmkN7C4Uo.jpg",
        prompt: "Infographic Drawing, diagram, infographic"
    },
    {
        styleName: "Ink Dripping Drawing",
        imageSrc: "images/J7s0kgdtdMJredSgSSJ-sTlV41CI2PlqyXOWX_gvYKQ.jpg",
        prompt: "Ink Dripping Drawing, ink drawing, dripping ink"
    },
    {
        styleName: "Japanese Ink Drawing",
        imageSrc: "images/hl67CKllkCxPKyvcVKKyjaMQVmmmYjKhxjEvheHBWMw.jpg",
        prompt: "Japanese Ink Drawing, ink drawing, inkwash, Japanese Ink Drawing"
    },
    {
        styleName: "Knolling Photography",
        imageSrc: "images/WarkT848Njv4PEfNvIxHli6U10s9G-2KKxs2MQp-1C4.jpg",
        prompt: "Knolling Photography, flat lay photography, object arrangement, knolling photography"
    },
    {
        styleName: "Light Cheery Atmosphere",
        imageSrc: "images/N0jz5_7udvkUKkFttajLZ_dZ5pA_Ob5XO_dEVCjqf_s.jpg",
        prompt: "Light Cheery Atmosphere, happy, joyful, cheerful, carefree, gleeful, lighthearted, pleasant atmosphere"
    },
    {
        styleName: "crayon drawing",
        imageSrc: "images/fzJm-D_Q91aqFkt6fgfv2CBBowUz6Zkzu3_FDmLr4yM.jpg",
        prompt: "crayon drawing-style, drawn in a vibrant crayon style, visible crayon strokes for a textured look."
    },
    {
        styleName: "Logo Design",
        imageSrc: "images/LQJEddXgiK4wRnSiGIYjLEnS707xhk-ml_7YhEnme7U.jpg",
        prompt: "Logo Design, dynamic graphic art, vector art, minimalist, professional logo design"
    },
    {
        styleName: "Luxurious Elegance",
        imageSrc: "images/NF41rCdHLRw0jESsLSaiqYSYZV-b8C27bFCHWeZ4PRQ.jpg",
        prompt: "Luxurious Elegance, extravagant, ornate, designer, opulent, picturesque, lavish"
    },
    {
        styleName: "Macro Photography",
        imageSrc: "images/Z04zex0PZc3cMOXh3vqMf9gHEiGTWMfDfztNrEwSN3E.jpg",
        prompt: "Macro Photography, close-up, macro 100mm, macro photography"
    },
    {
        styleName: "Mandola Art",
        imageSrc: "images/pcGypK9gT7ZLo-2hE4X4f-OWu9bfcGQMyQK8yhDVzYE.jpg",
        prompt: "Mandola art style, complex, circular design, mandola"
    },
    {
        styleName: "Marker Drawing",
        imageSrc: "images/m9lBAa4nO4D8MQTQPQQoM58fFtJAM_vz4TAgRNT_s_8.jpg",
        prompt: "Marker Drawing, bold marker lines, visible paper texture, marker drawing"
    },
    {
        styleName: "Medievalism",
        imageSrc: "images/n3cwK0xNTzCMm9ZXluZHxTPrJMRs1DftB163n7Sry2Q.jpg",
        prompt: "Medievalism, inspired by The Middle Ages, medieval art, elaborate patterns and decoration, Medievalism"
    },
    {
        styleName: "Minimalism",
        imageSrc: "images/egW92Jggp9sh1o2KDtr6Gh0XlxzAn-k0iXf3XSTHd2M.jpg",
        prompt: "Minimalism, abstract, simple geometric shapes, hard edges, sleek contours, Minimalism"
    },
    {
        styleName: "Neo-Baroque",
        imageSrc: "images/wEmyhJ5mxh0BSfJDOPvRLmcCI0skXAFP-K2HPt9cdI8.jpg",
        prompt: "Neo-Baroque, ornate and elaborate, dynamic, Neo-Baroque"
    },
    {
        styleName: "Neo-Byzantine",
        imageSrc: "images/I1W07O8H0hXkm4yn0t9XM1oEGrwRV81ojH3kNSd7mNk.jpg",
        prompt: "Neo-Byzantine, grand decorative religious style, Orthodox Christian inspired, Neo-Byzantine"
    },
    {
        styleName: "Neo-Futurism",
        imageSrc: "images/2sLCw3OVWlSC_xNXCNyvk6u57UOcsMV6oUlFj3JsylY.jpg",
        prompt: "Neo-Futurism, high-tech, curves, spirals, flowing lines, idealistic future, Neo-Futurism"
    },
    {
        styleName: "Neo-Impressionism",
        imageSrc: "images/ou0666hnzcrtNVSINjZfBu2eEYWz1kDfRxKz9RclmK8.jpg",
        prompt: "Neo-Impressionism, tiny dabs of color, Pointillism, painterly, Neo-Impressionism"
    },
    {
        styleName: "Neo-Rococo",
        imageSrc: "images/Cnj2Spgfqs8BAIXmD1yqj1H2I3sf1LGkKj7yShKp778.jpg",
        prompt: "Neo-Rococo, curved forms, naturalistic ornamentation, elaborate, decorative, gaudy, Neo-Rococo"
    },
    {
        styleName: "Neoclassicism",
        imageSrc: "images/pqhzh6mBTh9rSAsDXhv5Bb-ZnyFcPmTrCPnW0x9_VXw.jpg",
        prompt: "Neoclassicism, ancient Rome and Greece inspired, idealic, sober colors, Neoclassicism"
    },
    {
        styleName: "Op Art",
        imageSrc: "images/Ykzyh3hiitInqHozOi6_fKyM-b-EH9hMoWfyKpQmZXQ.jpg",
        prompt: "Op Art, optical illusion, abstract, geometric pattern, impression of movement, Op Art"
    },
    {
        styleName: "Ornate and Intricate",
        imageSrc: "images/nR6a5SF4kokYeBh6-x3xCgqQoQSSZIVgtl_Xfzgwqio.jpg",
        prompt: "Ornate and Intricate, decorative, highly detailed, elaborate, ornate, intricate"
    },
    {
        styleName: "Pencil Sketch Drawing",
        imageSrc: "images/e0vtQe-UBRKDgatGXKYuMc1NRT6dTMEpAdKBkjry8-s.jpg",
        prompt: "Pencil Sketch Drawing, black and white drawing, graphite drawing, and art supplies resting above the paper. Signature"
    },
    {
        styleName: "Pop Art 2",
        imageSrc: "images/kZ77MzrR3hpSKW4DYoKMBxT_iCy4kYdaw097hjbppV4.jpg",
        prompt: "Pop Art, vivid colors, flat color, 2D, strong lines, Pop Art"
    },
    {
        styleName: "Rococo",
        imageSrc: "images/im0YLEoD67ZNiGNUFtrSi8KhhPX6iGciKk95ajf2ySI.jpg",
        prompt: "Rococo, flamboyant, pastel colors, curved lines, elaborate detail, Rococo"
    },
    {
        styleName: "Silhouette Art",
        imageSrc: "images/wKeKGmLYtQz7_M0MHHtlZSwrmE9Uomf_AUrJvjXEego.jpg",
        prompt: "Silhouette Art, high contrast, well defined, Silhouette Art"
    },
    {
        styleName: "Simple Vector Art",
        imageSrc: "images/SYY274fw1MG9ahQxUFDeoL25NqCX5bmleGJOe6WZJdY.jpg",
        prompt: "Simple Vector Art, 2D flat, simple shapes, minimalistic, professional graphic, flat color, high contrast, Simple Vector Art"
    },
    {
        styleName: "Sketchup",
        imageSrc: "images/1uEa9Mu5gsBmi9zkXYEWA5cv7MF0Bn6YmDDnTWia2Y8.jpg",
        prompt: "Sketchup, CAD, professional design, Sketchup"
    },
    {
        styleName: "Steampunk 2",
        imageSrc: "images/eyZ3EFJeOiNUydcHgOZC5Eq4rYc171moZAYZ8V4V79c.jpg",
        prompt: "Steampunk, retrofuturistic science fantasy, steam-powered tech, vintage industry, gears, neo-victorian, steampunk"
    },
    {
        styleName: "Surrealism",
        imageSrc: "images/Ed9h_2R7EIkeaCeZP8dz8maJUaz5d8azobfpyU9fSzo.jpg",
        prompt: "Surrealism, expressive, dramatic, organic lines and forms, dreamlike and mysterious, Surrealism"
    },
    {
        styleName: "Suprematism",
        imageSrc: "images/N-XuoRqALvbuzHcdKK_xXcmJ1PmmEKDmdIl-VCeiSME.jpg",
        prompt: "Suprematism, abstract, limited color palette, geometric forms, Suprematism"
    },
    {
        styleName: "Terragen",
        imageSrc: "images/0SneOILOFQa8YWNyhL4bZeyKYCZt3h6os2xBr80mnHA.jpg",
        prompt: "Terragen, beautiful massive landscape, epic scenery, Terragen"
    },
    {
        styleName: "Tranquil Relaxing Atmosphere",
        imageSrc: "images/LAKV_gF4IqGwkib1y9G5yt7UOVNxMCIp1ZM5M0D9jDg.jpg",
        prompt: "Tranquil Relaxing Atmosphere, calming style, soothing colors, peaceful, idealic, Tranquil Relaxing Atmosphere"
    },
    {
        styleName: "Sticker Designs",
        imageSrc: "images/zN3nM9QOPyD-7mlWdOu_wRTqBCLeInIlcJ7tZNqQpYY.jpg",
        prompt: "Vector Art Stickers, professional vector design, sticker designs, Sticker Sheet"
    },
    {
        styleName: "Vibrant Rim Light",
        imageSrc: "images/EDoZCsNam_vQOvtJ0Yl33f0mDf70VoB9WNVk8rKKFaE.jpg",
        prompt: "Vibrant Rim Light, bright rim light, high contrast, bold edge light"
    },
    {
        styleName: "Volumetric Lighting",
        imageSrc: "images/WtNl07A7XrHBX-2oO4Kqc9GvG7_AFOj1OkCVsR1bP9M.jpg",
        prompt: "Volumetric Lighting, light depth, dramatic atmospheric lighting, Volumetric Lighting"
    },
    {
        styleName: "Watercolor 2",
        imageSrc: "images/wEfnn2E8CpghmOC4aC_Jd_Wu3jqBWgXCajHy6Tk4xa0.jpg",
        prompt: "Watercolor style painting, visible paper texture, colorwash, watercolor"
    },
    {
        styleName: "Whimsical and Playful",
        imageSrc: "images/KkBo6PqZOWF8aTBnzdsBv2wWdXa_y20bFmQTsgWGRPg.jpg",
        prompt: "Whimsical and Playful, imaginative, fantastical, bright colors, stylized, happy, Whimsical and Playful"
    },
    {
        styleName: "Cardboard-Style",
        imageSrc: "images/R5QJBCQZsyadKlsrIlIaGh1zZAXQpS7NtBR-wKwaWSM.jpg",
        prompt: "cardboard {Animal}, realistic design, detailed craftsmanship, eco-friendly materials, intricate textures, paper sculpture, life-sized model, creative art, handmade, recycled materials, artistic creation"
    },
    {
        styleName: "oil painting-Realism",
        imageSrc: "images/K9DQY7wmi0Btsk7Xe3GX67aNJpMfXr0T4xz6AVjr7Nc.jpg",
        prompt: "breathtaking oil painting,{Animal}, photorealistic oil painting, by charlie bowater, fine details, by wlop, trending on artstation, texture detailed."
    },
    {
        styleName: "Cute figurine",
        imageSrc: "images/wjo_bCdgDVYC1bFCeyCoka2Szgk3alRrKQb6wBYpiAE.jpg",
        prompt: "Cute figurine, {Animal}, figurine, modern Dizney style, octane render, chibi"
    },
    {
        styleName: "tattoo design",
        imageSrc: "images/beduj-XRLZtAhdHHZqRWqwQAUP51gHpFMc_cYCM6wEQ.jpg",
        prompt: "amazing tattoo design, {Animal}, breathtaking tattoo design, incredible tattoo design"
    },
    {
        styleName: "molding-style",
        imageSrc: "images/Mwjj_hip7gexkxQXjnxQePWusVSIdWFPNYnEmiRoe8E.jpg",
        prompt: "molding-style depicting intricate details, 3D depth, flowing lines, textured surfaces, layered composition, sculptural relief artistry, visually compelling, nuanced form"
    },
    {
        styleName: "Cute Anime Ghibli",
        imageSrc: "images/wFzvKBInJrraFw84saU5Qx-s608SUV0TblBp6Kfcko0.jpg",
        prompt: "adorable, cute, Kawaii, {Animal}, Ghibli art style, Spirited Away art style, cute moe anime character portrait, adorable, featured on Pixi, kawai moé masterpiece, cuteness overload, very detailed, so adorable!!!, subtle nuances, wonderful"
    },
    {
        styleName: "Cute 3D icon",
        imageSrc: "images/BgQ3F4xUf7ep40RPycAeASAo9CFL3UX-MtsI00NiInQ.jpg",
        prompt: "Cute 3D {young Asian Woman} Icon, Cartoon Style, Stylized Octane Render, 8K, Masterpiece, Adorable, Beautiful, Soft Lighting, Soft Colors, Centered, High Resolution, Gradient Background"
    },
    {
        styleName: "Japan Anime",
        imageSrc: "images/s2Om18aa3RE6ddr78OekIGhJHKA0ZfOaaKIhzKunGUQ.jpg",
        prompt: "studio Ghibli style art:1.3{ young Asian woman}, sharp, very detailed, high resolution, inspired by Hayao Miyazaki, anime, art from Ghibli movie"
    },
    {
        styleName: "1980s Photo",
        imageSrc: "images/UGGYQFGZzIa9xFVQv8_qkBnxXMqFTxA_HnjM8ZLj9jY.jpg",
        prompt: "Vintage 80s Photo, Grainy, Kodacholor II, Vignetting, Retro, Old-School, Wear and Tear, Creasing, Scratches, Vintage Colors"
    },
    {
        styleName: "Embroidery and Needlework",
        imageSrc: "images/npTpA4Y5DA-qsMcftoUgHshMpTw2kGdskZCFP4Y-Jwg.jpg",
        prompt: "Textile crafts-style, intricate embroidery, depicting {young Asian woman}. The embroidery features a rich textured composition with a blend of satin stitches and detailed cross-stitch patterns"
    },
    {
        styleName: "Patchwork and Quilting",
        imageSrc: "images/12NxOFHLgT0grBtLjMS3eJPqzrC9vEHs2dwFdQzf3V0.jpg",
        prompt: "Textile crafts-style, patchwork, quilting techniques, depicting {a Thai girl}, geometric patterns, layered textures, pieced blocks, appliqué designs, quilted motifs, cozy structured composition"
    },
    {
        styleName: "Felting and Fiber Arts",
        imageSrc: "images/FTs5BuoOXQfunoSqqoKQMvKanF-oA0y0Jtn9HZ4lPDM.jpg",
        prompt: "Textile crafts 3D artwork, felting and fiber arts, sculptural forms, soft textures, needle felting, wet felting, mixed fiber compositions, tactile expressive composition"
    },
    {
        styleName: "Knitting and Crocheting",
        imageSrc: "images/PwDv8pX-pXV6AjpKGIew6G8joziGZxt5ju3s6rXggXA.jpg",
        prompt: "Crocheting, depicting, Making clothing, accessories, and home decor items like scarves, hats, blankets, and more"
    },
    {
        styleName: "Crocheting Characters",
        imageSrc: "images/1XRStbBRJ1Ul4vhKwfwZPJTHQVoLF0MUFKJ6t8q-hhA.jpg",
        prompt: "Amigurumi Crochet, Characters, Handmade, Yarn Art, Cute Toy, Detailed, Creative Design, Fiber Art, Crafting, Soft Sculpture"
    },
    {
        styleName: "T-Shirt Printing-Style",
        imageSrc: "images/5fj2P_K3r8n4nzVjWhuNIAvYx3ULxx-_-iYqZNiqMQU.jpg",
        prompt: "T-shirt printing style, visually compelling graphic, bold lines, vibrant colors, stylized typography, iconic symbols, modern t-shirt graphics, contemporary guidance"
    },
    {
        styleName: "T-Shirt Printing-Style: Vintage Retro Illustration",
        imageSrc: "images/pmi9A8axs5qeeSqroSwPp9A0KcDOMM6eZF-ot0PxDm8.jpg",
        prompt: "T-shirt printing style, vintage-inspired illustration, retro colors, distressed textures, nostalgic motifs, classic aesthetics, modern appeal."
    },
    {
        styleName: "T-Shirt Printing-Style: Abstract Artwork",
        imageSrc: "images/5qYFXneOP2RzAq5Y6sjKA9Y6Jzo2IWYI48muZFqoYCE.jpg",
        prompt: "T-shirt printing style, abstract artistic approach, fluid shapes, experimental color combinations, mixed media techniques, contemporary dynamic composition."
    },
    {
        styleName: "T-Shirt Printing-Style: Pop Culture Iconography",
        imageSrc: "images/R8FsslvkfyuroFh6I_48q1X73yrEcpPuKT19x6oPFiU.jpg",
        prompt: "T-shirt Design, Pop Culture Iconography, Iconic Symbols, Recognizable Characters, Emblematic Motifs, Thematic Appeal."
    },
    {
        styleName: "T-Shirt Printing-Style: Nature and Wildlife",
        imageSrc: "images/ylkMlgr2DTUIfL47igWG37QGoIHsntm3JucD41EBvgY.jpg",
        prompt: "T-shirt design, Nature and Wildlife Themes, Intricate Foliage, Wildlife Silhouettes, Natural Textures, Beauty of Nature."
    },
    {
        styleName: "Cardboard crafts: Furniture Design",
        imageSrc: "images/qWGQptZM8g0PHFah6yF-FNA02s3f4ZIhR-R9MBehXao.jpg",
        prompt: "Cardboard Furniture Design, Functional Innovation, Structural Integrity, Ergonomic, Creative Embellishments, Sustainable Material."
    },
    {
        styleName: "Cardboard crafts: Costume or Prop",
        imageSrc: "images/s5LpOMX92_v5egGz6diJ6tQKnR09v96NellIrSuC-tE.jpg",
        prompt: " -Inspiration, Cardboard Costume/Prop, Lightweight Durability, Intricate Detailing, Movable Parts, Thematic Embellishments, Imaginative Cosplay."
    },
    {
        styleName: "Cardboard crafts: Model Making",
        imageSrc: "images/9fdsJSo9IezL3da18D0xe-Ibdk663pc2vRyxcSMifKM.jpg",
        prompt: "Detailed Cardboard Model, Precise Measurements, Intricate Assembly, Scaled-Down Proportions, Realistic Textures, Functional Components, Craftsmanship, Engineering Possibilities, {Coffee shop}"
    },
    {
        styleName: "Realistic Sticker Design",
        imageSrc: "images/SEezDawAcsa7LXo-qrWRjwXadHSOf0PTmoq3dDlvl_A.jpg",
        prompt: "Pixar Animation sticker, {Animal With [expression]}, full-body, black background."
    },
    {
        styleName: "Cardboard crafts: helmet",
        imageSrc: "images/-p5uGWOzLOyXiN0TG9LmvlUk2WIH7sOUY6kqatH2VVw.jpg",
        prompt: "Cardboard Helmet, {Aardwolf} Style, Detailed Craftsmanship, Realistic Textures, Intricate Folds, Playful Embellishments, Wearable Design, Imaginative Cardboard Creation, setting in store."
    },
    {
        styleName: "Helmet design",
        imageSrc: "images/iwWrh62Yr3_UN6EQYWM_jK3fM1VNmP8KAZvVnht7u8g.jpg",
        prompt: "{Tiger}-shaped design, Realistic helmet photo, helmet store setting, high resolution, detailed, vibrant colors, integrated animal features, futuristic sleek, display shelves, authentic materials, retail lighting."
    },
    {
        styleName: "AutoCAD-style",
        imageSrc: "images/DaE3x_yxLB11jSRl9VC_nuqyqvKBQNcg3fBfYBAZPAM.jpg",
        prompt: "AutoCAD-style depicting {a building} with precise and detailed technical drawings. Features should include clear lines, dimensional annotations, isometric views, and cross-sectional details, capturing the essence of professional technical drafting."
    },
    {
        styleName: "3D Print-style",
        imageSrc: "images/KW35Jmi6dBtFFGD2qW77OiwfTYasiKiNPZH4L004rPA.jpg",
        prompt: "3D Print-style, On Pedestal, Detailed, Precise, Layers, Textures, Material Properties, Intricate Details, Realistic, 3D Printing Aesthetics."
    },
    {
        styleName: "Manga Characters",
        imageSrc: "images/5elus9XgjOTWiEJnoSbOj48wea77QneZFqP6tOfgrjQ.jpg",
        prompt: "Manga Style, Full-Body Character, {Setting/Scenario}, Exaggerated Proportions, Dynamic Poses, Expressive Facial Features, Intricate Details, Classic Manga Characteristics."
    },
    {
        styleName: "Realistic 3D character-Style",
        imageSrc: "images/TuGYb1zTHaHaGtV0m2kqU5Pfc_Ky3liS41nF6lhEPhE.jpg",
        prompt: "Full-body Realistic 3D character, high detail, lifelike textures, dynamic pose, expressive face."
    },
    {
        styleName: "Packing design-style",
        imageSrc: "images/bm9VaHBzw1b304Whzx6vaPrdNkpPS9PeT8OLIjtXfUM.jpg",
        prompt: "packing template design-style depicting {Product or Package}, with creative and eye-catching packaging aesthetics. The design should feature Specific elements such as branding elements, product visuals, labeling details, and packaging materials, capturing the essence of effective packaging design in a visually appealing and functional format."
    },
    {
        styleName: "Animal shape vase-style",
        imageSrc: "images/Z98tb3lGCWuaNsNv5REiXSrzOvUs_rhUwPmweBisGVM.jpg",
        prompt: "Whimsical design, {animal}-shaped {vase}, realistic representation, artistic elements, lifelike features, intricate craftsmanship, narrative and emotion, functional art, decorative piece."
    },
    {
        styleName: "Animal shape Chinese vase-style",
        imageSrc: "images/9JJGI0mpcmFqGtG9hkRzFufZOaGk4kJYEO5ylV-TOOA.jpg",
        prompt: "Whimsical design, {animal}-shaped vase, realistic representation, white and blue porcelain, traditional motifs, artistic expression, lifelike features, cultural significance, decorative art, intricate craftsmanship, Exhibition Venue Background."
    },
    {
        styleName: "handicapped-style",
        imageSrc: "images/evnNzcJjCaDr_6I2BmpEbqpVNYOTJd1GyGOzFBr0rJ0.jpg",
        prompt: "Wheelchair, {a young Asian woman}, Accessibility, Inclusive Design, Mobility Aid, Adaptive Equipment, Disability Representation, Inclusive Environment, Supportive Technology."
    },
    {
        styleName: "Human pose-style",
        imageSrc: "images/424fIpxG7VdD0t-s8KH8U8VEAqJK5jjpnpjdXI5KeKc.jpg",
        prompt: "Human posing, {{}}, dynamic stance, expressive gesture, natural lighting, clean background."
    },
    {
        styleName: "4K movie-style",
        imageSrc: "images/S9-W_ptn8q4yEbxoPp5e5c7VlxFP87O9TSl7_4pQfn0.jpg",
        prompt: "4K, cinematic excellence, {{Scene/Subject}}, dramatic lighting, detailed textures, dynamic composition, realistic depth of field, immersive, visually compelling."
    },
    {
        styleName: "1960s movie-style",
        imageSrc: "images/kXwxGMqdLXSZldEv1jIJV6dDod48ceqs0plOs1aPwqA.jpg",
        prompt: "1960s movie-style depicting {{Scene or Subject}} with nostalgic charm and cinematic flair reminiscent of classic films from the 1960s era. The image should feature Specific elements such as vintage color palette, retro fashion, iconic props, and classic cinematography techniques, evoking the spirit and aesthetic of that cinematic period."
    },
    {
        styleName: "old photos torn-style",
        imageSrc: "images/19HWJ_ev3lh5W-VgRe-lYU5eDy0uWEQZnmjCvqjBoJo.jpg",
        prompt: "Old Photos Torn-Style, {{Selena Gomez 20-year-old}}, Aged Photograph Appearance, Sepia Tones, Faded Colors, Creases, Torn Edges, Realistic Aging Effects, Nostalgic Vintage Aesthetic."
    },
    {
        styleName: "3D logo Design",
        imageSrc: "images/A-Wnlxms7mhUqsCDEfGUXiBPVeK5hYFjjXNp-SKgR_s.jpg",
        prompt: "3D logo, {{Hot Wheels}}, modern design, bold colors, intricate details, high depth, clear background."
    },
    {
        styleName: "water bottle-style",
        imageSrc: "images/gQxn-qUR22qaljqqfm0DKI9adKdo-LOzgyjg6Btjz4Y.jpg",
        prompt: "Creative water bottle, {Cat}-Shape design, durable materials, eco-friendly, ergonomic shape, expressive features, hydration accessory, whimsical charm."
    },
    {
        styleName: "Ge ometric Acrylic Banner",
        imageSrc: "images/3WdUboLVSuUxWfyoa-Mc3lVA2kvq7yWQ4MpDYGSrYMU.jpg",
        prompt: "a geometric acrylic banner showcasing {a Khmer girl}, with precise shapes and bold patterns. The banner should incorporate Specific elements like symmetrical designs, contrasting colors, or optical illusions, creating a modern and visually impactful statement piece."
    },
    {
        styleName: "Colored Pencils Drawing: full-body",
        imageSrc: "images/ltuDFZYmkzkJnaYxqSEwGvK1BvBjQ72q4Ho1Vvv9CK4.jpg",
        prompt: "Full body colored pencil drawing, {a young Asian woman}, A4 size, vibrant colors, meticulous detail, light and shadow, texture, depth, artistic expression, visual impact, technique, lifelike portrayal, Signature @drawaesna."
    },
    {
        styleName: "sketching",
        imageSrc: "images/rDxq6r31tloxhI20gv2O-HLIZPTOdSW9-tj9Ju-Yjdc.jpg",
        prompt: "artist sketching on a drawing pad, using pencils and erasers, {{cat}} detailed and focused, creative process, artistic workspace, realistic hand movements, varied shades and textures."
    },
    {
        styleName: "wooden toy",
        imageSrc: "images/cm0n6QMNbHV-bMXCSDzTXw-UqZDvcJuD_E9kHEYYTrw.jpg",
        prompt: "Handcrafted {{}-Shaped Wooden Toy | Eco-Friendly Wooden Animal Figures | Artisanal Wooden Toys for Kids."
    },
    {
        styleName: "Wooden Furniture-style",
        imageSrc: "images/udWLKGidSyLXyTvlxphsIYREaMLJO-fkttVD40HG4lk.jpg",
        prompt: "Wooden furniture, {cat}-shaped, a bed, artistic design, carved details, functional, natural finish, unique decor."
    },
    {
        styleName: "Realistic Caricature-Style",
        imageSrc: "images/JF3io6zUwEV8FWsZ5LOabffjAmaVQR3aJwnqEx1kn30.jpg",
        prompt: "Realistic caricature, {Animal}, detailed features, exaggerated expressions, lifelike colors, humorous style, high-resolution, background."
    },
    {
        styleName: "Full body Vector",
        imageSrc: "images/w5ZUbfDLEsidqTcn-6UDHaam4sokS8fh7dFL_dlxGT8.jpg",
        prompt: "Full-body vector, {a Khmer girl} illustration, clean lines, bold colors, modern, stylized, proportions, details, depth, simple background, complementary background, shading."
    },
    {
        styleName: "Pop-up card-Style",
        imageSrc: "images/nkOg02i63QqDn7V6sNrdJ-CPUKkxk6yEtfHqPm7gkWw.jpg",
        prompt: "Pop-up card, {young Asian woman}, 3D scene, flat-to-rising design, specific details, folded paper, layered depth, interactive features, whimsical, engaging."
    },
    {
        styleName: "Mug-style",
        imageSrc: "images/5BkulFDKbJkJhFophATsd-kfP3HK5O-B-r1QFMAFJ60.jpg",
        prompt: "Whimsical mug, {Cat}-shaped design, high-quality ceramic, playful contours, vibrant glaze, comfortable grip, textured details, joyful drinking experience, kitchenware, artistic flair."
    },
    {
        styleName: "Copper sculpture-Style",
        imageSrc: "images/YIInJ518_epcdDMkJ5i2Hw6fXqIj23_xjGaQmVt-Sa4.jpg",
        prompt: "Copper sculpture-style depicting {Animal}, emphasizing three-dimensional form, intricate textures, and the metallic sheen of copper. The design of the seat appears to be carved from copper, featuring smooth curves, detailed contours, and a reflective surface."
    },
    {
        styleName: "Thai silver art-Style",
        imageSrc: "images/qFIqgffVdKoscr2ijWg0USdB_ZBvDuvf-0KuUc6OZXY.jpg",
        prompt: "Thai silver art, {cat}-shaped, intricate design, cultural motifs, detailed craftsmanship, traditional style, metallic finish."
    },
    {
        styleName: "Furniture Design",
        imageSrc : "images/IBEwyeZlWSSJ7fzD3Qhvx-sgedWdqXVaW7GdOc42iak.jpg",
        prompt: "Furniture design, {Tiger}-shaped, artistic style, creative concept, functional decor, unique craftsmanship, whimsical form, Located in the bedroom."
    },
    {
        styleName: "Realistic Cute figurine",
        imageSrc: "images/RvLcK7PMqlgfePial7cwYNYdHe0RPKvcwUmqMZDfKSU.jpg",
        prompt: "Realistic cute figurine, {a young Asian woman}, highly detailed, soft lighting, lifelike features, vibrant colors, adorable expression."
    },
    {
        styleName: "Acrylic furniture-Style",
        imageSrc: "images/WV1InRnofUnCiULQu8UXY2f3ALqLxFRWjxATLtbRLOI.jpg",
        prompt: "Acrylic {Monkey sitting on a branch}, modernity, sophistication, clear acrylic, transparent, minimalist design, openness, elegance, tinted acrylic, serene ambiance, contemporary artwork, understated luxury."
    },
    {
        styleName: "Giant animal transported",
        imageSrc: "images/GA_2lgvyOaThJREczX-1Oh3fnQA9GGuMwZTaTP-GtVk.jpg",
        prompt: "Giant {monkey}, transport, truck, stuck mud, surrounded people, monkey size, muddy terrain, people’s reactions, realistic, dramatic, detailed, challenge, spectacle, scale, environmental details, human activity, compelling narrative."
    },
    {
        styleName: "Architecture design",
        imageSrc: "images/oJhZm-ijpwXbLnD_ck2BoeINq3e01MSYoIb-UTrXhxk.jpg",
        prompt: "Animal-shaped {house} exterior, {young Asian woman}, whimsical architecture, creative design, animal-themed building, tourist attraction, unique home."
    },
    {
        styleName: "Fan-Design",
        imageSrc: "images/bgn9XwE-0PbpzkUnyI25wOHiTYXn5q3uAkKPyTv3Yso.jpg",
        prompt: "Creative {Pedestal fan}, {cat}-shaped, creative design, artistic features, functional decor, whimsical style, unique appearance."
    },
    {
        styleName: "sculpture Wooden Design",
        imageSrc: "images/oZS8IVtk5l3tzix57mcqEe6CAKctIifoXF12w8v3odA.jpg",
        prompt: "Whimsical sculpture, {Monkey}-shaped design, handcrafted wood, artistic expression, natural materials, rich grain, expressive features, smooth polish, hand-painted accents, versatile décor."
    },
    {
        styleName: "spice cans design",
        imageSrc: "images/9tAOyAgYOkJkgWTqYBMX5r9HEY_7T1FoysIHI4OcPys.jpg",
        prompt: "Whimsical spice cans, {{animal}}-shaped design, kitchen decor and setting, food-safe materials, vibrant colors, expressive features, functional and decorative, removable lid, labeled containers, charming addition."
    },
    {
        styleName: "vacuum design",
        imageSrc: "images/vn5GG2zDtZ2DJCPEiTqFb671y1RT0UWZeEXujEZDVh8.jpg",
        prompt: "Realistic whimsical {{vacuum}}, {{cat}}-shaped design, charming household appliance, setting in Livingroom."
    },
    {
        styleName: "Kid motorcycle design",
        imageSrc: "images/-DQcgeFFp11L-jTcx6yRTl1EApTuPtmcNUAGmgi3QN0.jpg",
        prompt: "Kid motorcycle, {{Monkey}}-shaped, playful design, child-friendly, creative craftsmanship, Height safety, setting in kids' room, colorful decor, playful environment, toys, and books."
    },
    {
        styleName: "buildings-fruits Vegetables Design",
        imageSrc: "images/saYJlTZKEhs_c58hjWFPPelLHweEsRCkP0o7UnV2oS0.jpg",
        prompt: "Whimsical luxurious {{carrot}} {{house}}, soft fur exterior, cozy impression, ornamental plants, magical serene atmosphere, bright sunny weather, natural daylight."
    },
    {
        styleName: "Motorbike modified, mobile café shop",
        imageSrc: "images/uzJd2-7vAOIlVYqfqb3GFCIHrCEaKT0ksZBDjBghu5M.jpg",
        prompt: "Modified {{motorbike}} café, compact, functional, coffee equipment, barista station, serving counter, seating, retractable awning, storage, aesthetic design, urban mobility, outdoor setup, customer engagement, customizable menu, espresso machine, grinder, milk frother, sink, electricity, LED lighting, branding, innovative."
    },
    {
        styleName: "CNC 3D puzzles",
        imageSrc: "images/J8NzX_jNU6OxbHvibs1TMNRsxll_H0bo74eqTLQW9YM.jpg",
        prompt: "3D puzzles, {{an Elephant}}, CNC machining, Precision design, Engaging assembly, Intricate pieces, Interlocking tabs and slots, CAD software, Wood, acrylic, metal, Detailed 3D models, Structural integrity, Clear assembly instructions, Engraving and etching, Themed puzzles, Prototyping and testing."
    },
    {
        styleName: "Kid's Toy Design",
        imageSrc: "images/3YpH8SHjMLyHg9SaZImm95eOYSGvIGng_9mSvCqjzQY.jpg",
        prompt: "Realistic Kid's toy, {{Animal}}, whimsical design, interactive elements, educational play, imaginative exploration, safe materials, age-appropriate, colorful design, kids room Background."
    },
    {
        styleName: "Ceramic tile design",
        imageSrc: "images/MDp7PhcbSjUUttE73jZzw65BL24H3I5mdOG6tknoJlU.jpg",
        prompt: "Ceramic tile design, geometric patterns, vibrant colors, intricate motifs, depicting {{a Thai girl}}, glossy finish, symmetrical layout."
    },
    {
        styleName: "Vehicle design",
        imageSrc: "images/rRbcHO97-QTfAP-e6SC35gF3e8fvmuD-ivnzZP8anvM.jpg",
        prompt: "Animal-shaped vehicle, creative design, whimsical transportation, {{Cat}}-themed car, unique vehicle, eye-catching automobile."
    },
    {
        styleName: "Trailer design",
        imageSrc: "images/OmSF8LuZLWu03OqYaOayB9_SlvoaG-U2bsbtHXtFQnc.jpg",
        prompt: "{{Cat}}-shaped trailer, creative RV design, animal-themed mobile home, unique camper, whimsical travel vehicle, eye-catching caravan."
    },
    {
        styleName: "GTA-6 style",
        imageSrc: "images/-3H1YordIL8aXLr3rpqevormaeU5zxeyG8zI7XMjfrg.jpg",
        prompt: "Realism, GTA6 style, {{detailed scene}}, urban environment, diverse characters, realistic shadows, reflections, vibrant atmosphere, lifelike textures, expressions, clothing details, hair details, facial details, immersive, action-packed, iconic style, energetic."
    },
    {
        styleName: "wooden sculpture",
        imageSrc: "images/cJEUHDWmCdThXu2i6geWZHremntVuXY_8Sx9ETKFnjw.jpg",
        prompt: "A young African boy standing next to a large carved wooden sculpture of a {{Lionel Messi's head}}, in a rural outdoor setting with trees and bushes in the background."
    },
    {
        styleName: "vehicle plastic design",
        imageSrc: "images/QxwDvwkbBS5mdNses6jNig5kUZfqMaCVYvEvfC7fapQ.jpg",
        prompt: "Vehicle made from {{plastic bottles}}, recycled materials, eco-friendly transportation, {{young boy}} standing, field background, environmental awareness, sustainability, recycling innovation."
    },
    {
        styleName: "vehicle Fruit design",
        imageSrc: "images/qRk4Gkuk1eDwUIQMBpE0Yb5FpNNJR2eaBNkdcEB3918.jpg",
        prompt: "Vehicle Fruit {{vehicle}}, farm setting, young boy standing, agricultural scene, environmental awareness, sustainability, creative reuse, natural materials, whimsical transportation."
    },
    {
        styleName: "Paper cutting design",
        imageSrc: "images/OITzJ-k5sUrnZXsgs-aIPgtL66o9qF1ZOAxlE2xIl6w.jpg",
        prompt: "Paper cutting, {cat}-shaped art, intricate details, craftsmanship, artistic technique, paper medium, cultural symbolism, wildlife conservation, black background."
    },
    {
        styleName: "Ecological art",
        imageSrc: "images/Bcj1IHfvmXa0guLr2TBl3qQZk6ZBUdYa6TcG0HlUm0Y.jpg",
        prompt: "Ecological art, {animal}-shaped designs, sustainable materials, natural aesthetic, symbolism, community engagement, educational impact, artistic innovation, biodiversity conservation."
    },
    {
        styleName: "Collectible toy",
        imageSrc: "images/H68zKb9nRifNwE-f4fItarROiN9_fvJ5u8SnZxyqpOA.jpg",
        prompt: "a Collectible toy {animal} figure, packaging box, display presentation, detail and craftsmanship, collectors' appeal, artistic presentation, toy collecting."
    },
    {
        styleName: "PC Case Model Design",
        imageSrc: "images/NhtTJ0VmbRRA51ryvJMkiZA6tn9yZDYNfFhXMgAQQSc.jpg",
        prompt: "(goat) Warrior Head, Robot, PC Case, Sleek and Sporty Design, Aerodynamic Shape, Glossy Black and white Stripes Finish, Carbon Fiber Elements, RBG LED String Highlights, Cybernetic Features, High-Performance Aesthetic, Japanese Craftsmanship, Elegant Lines, Futuristic Detailing, Racing Spirit, Luxury Technology."
    },
    {
        styleName: "Mobile motorcycle Cafe bar",
        imageSrc: "images/-SxVqZNDgA-LoU0h1idspsg7v06Dj61QUn1sGjuboxk.jpg",
        prompt: "Envision a {motorcycle} modified with a sidecar that doubles as a compact coffee bar. The motorcycle exudes a blend of retro and contemporary styling, equipped with an espresso machine, compact storage for barista tools, and fold-out counters for serving freshly brewed coffee and snacks."
    },
    {
        styleName: "Gaming PC case",
        imageSrc: "images/zyERL_VoE250OZ-Va6JkBayzpg8anbUVU1uyNU24dMQ.jpg",
        prompt: "Gaming PC case, {dog-shaped}, sleek design, RGB lighting, transparent panel, modern, high-tech, cooling system, stylish, compact, futuristic."
    },
    {
        styleName: "Flat Art Style 2",
        imageSrc: "images/n4CiL_eQbaQBEKUYIGTSp5bFnLyGCUNjtG_iWjCWOwY.jpg",
        prompt: "Flat design, {Animals}, Minimalist, Vector art, Bold colors, Simplified shapes, Clean lines, Graphic style, Cartoonish, Abstract, Modern."
    },
    {
        styleName: "porcelain style",
        imageSrc: "images/sPzAHEFMU5KXuSiNdXBp_wmAEjG2ChwC8PrBy2bBieM.jpg",
        prompt: "Photorealistic porcelain {cat}, Blue and white patterns, Sitting pose, Intricate details, Delicate porcelain texture, Lifelike appearance, Subtle variations, Realistic lighting, Artistic craftsmanship, Decorative ornamentation."
    },
    {
        styleName: "rattan style",
        imageSrc: "images/euFtTKVs_OZciiiyg2Q5h7rffABJmRaT__0XGfDjiGU.jpg",
        prompt: "{animal} figure made of rattan, Whimsical design, Cozy house interior, Natural texture, Flexibility of rattan, Artistic interpretation, Intricate weaving, Charming details, Mythical creatures, Imaginative concept, Creative and imaginative."
    },
    {
        styleName: "Polar Panorama-style",
        imageSrc: "images/lEbgIEfu7L-GdRyR75b02tlkvT8XSAEQX9iaOrZ3yeE.jpg",
        prompt: "Polar Panorama, {animal}, 360-degree view, spherical layout, immersive scene, expansive."
    },
    {
        styleName: "group anime characters",
        imageSrc: "images/vC2BpWRQuXuq5RQ7oh5yaqOG9MyTpauHltJjmDlc5LA.jpg",
        prompt: "A group of anime characters from the {Naruto} series, in chibi style, standing in a black box with straw-like material on the bottom. The characters are all wearing their iconic outfits and have different poses."
    },
    {
        styleName: "portrait paper cutout",
        imageSrc: "images/B4beVmeRHpTY4fHK2GtsTlbLsnvF1qj7Qh550HrZOWc.jpg",
        prompt: "A black and white portrait of {a woman}, made of layout paper cutout artwork, looking at the viewer, against a black background, displayed on a wooden background."
    },
    {
        styleName: "3D rock-shaped",
        imageSrc: "images/ob3Lvu9VwgMOl-O4k44FY76CJcgHiZ-KguHbeHko2ag.jpg",
        prompt: "3D rock-shaped {Cat figure} with natural textures, organic forms, rough and rugged appearance, realistic surface details, cracks and crevices, fine and coarse textures, integrated figure, subtle details, character and interest, set on a rocky terrain background, in STL format for CNC machining, considering material properties."
    },
    {
        styleName: "Motor Front Car",
        imageSrc: "images/rvAnlpUCoz4c-VAnE_02wnh3KSeCyjQUCgu_OKpql0U.jpg",
        prompt: "{Lamborghini Islero} motorcycle in front of a {green} supercar, front view, sleek design, glossy finish, sunlight reflections, high-performance vehicles, detailed surfaces, metallic accents."
    },
    {
        styleName: "Fruit Crying",
        imageSrc: "images/HlLC4DtkSlwn3sYJw4ylY1UVyup1NZFLrpPFA-Tgep8.jpg",
        prompt: "[Banana] crying face, much white liquid, hanging stalk, a young woman with long black hair walking away, lush green field, sunny day, main focus on [Banana], blurry background."
    },
    {
        styleName: "Draw with thread-realism",
        imageSrc: "images/84Wxbvv3UYJCmv5BzTkQKdzajJXUYW4NU0dgxyyyqhc.jpg",
        prompt: "{[a girl reading book]}, thread drawing, on pedestal, wooden table, delicate, artistic design, intricate details, realism colors, minimalist style, round framed, natural wood, distressed finish, rustic charm, polished table surface, craftsmanship, handmade artistry, serene atmosphere."
    },
    {
        styleName: "stylized line art-style",
        imageSrc: "images/SmDRHBiGduuBGppnwGLdFjPbS0MyF3hyOOXK9mpoAH4.jpg",
        prompt: "stylized line art of {[Animal]}, all contained within a black frame on a white wall."
    },
    {
        styleName: "Sculpture scene inside",
        imageSrc: "images/NHgYGi30G6M2_vVXFgNhZA6JfWO2BCe136-VKE_ZMFI.jpg",
        prompt: "A wooden sculpture of a {[howling wolf]} with a detailed forest scene inside it, lit from behind casting a warm glow."
    },
    {
        styleName: "Realism-style",
        imageSrc: "images/LJw_TkQ1tU2AK7CFfUF1Qec5DpOtgO6TWH02RNUj3NM.jpg",
        prompt: "realism style, {[Animal]}, highly detailed, lifelike representation, accurate proportions, realistic textures, precise attention to detail, natural colors, intricate details, advanced shading, highlighting techniques, depth, three-dimensional, realistic portrait, realistic landscape, realistic still life, complementary background, contextual background, realistic composition."
    },
    {
        styleName: "Leaves-shaped",
        imageSrc: "images/mQuuufPJicac1putEhh_gILtN12XJF2fuBQ1CH9k6KY.jpg",
        prompt: "Anthropomorphic figure, {[Mona Lisa]}, Leaves-shaped, Nature, Organic beauty, Foliage, Maple leaves, Oak leaves, Ferns, Vibrant colors, Textures, Natural patterns, Fluidity, Human-like expression, Harmony, Dew drops, Insects, Serene setting, Lush forest, Tranquil pond, Soft lighting, Depth, Realism."
    },
    {
        styleName: "African boy and crushed wood",
        imageSrc: "images/7phvtimVG4XYPi64rWcTKJVgjJiTQG9ZE2vzlEQ3L04.jpg",
        prompt: "Close-up portrait of {[an African boy]} standing next to an anthropomorphic {[owl]}-shaped figure made of crushed and splintered wood, embodying resilience and the beauty of nature, in a tranquil forest clearing with natural lighting effects."
    },
    {
        styleName: "crushed wood-shaped",
        imageSrc: "images/so6K92c2Edl41zQXa_0_A7RTTmUOOhlA9m1f9-XPNF8.jpg",
        prompt: "Anthropomorphic figure, {[Mona Lisa]}, Crushed wood-shaped, Natural materials, Resilience, Beauty of nature, Splintered wood, Organic movement, Texture, Tones (browns, grains), Imperfections, Strength, Contemplation, Transformative power of nature, Moss, Lichen growth, Natural setting, Forest clearing, Tranquil environment, Lighting effects, Organic beauty."
    },
    {
        styleName: "garbage-style",
        imageSrc: "images/JA7Jf7oHneu9b5X3QkzQFS4C1EuQJYtKD0rT5n4Glsk.jpg",
        prompt: "An anthropomorphic figure resembling {[Mona Lisa]}, shaped from garbage to symbolize environmental awareness and waste management. The figure is crafted from discarded materials like crumpled paper, plastic bottles, metal cans, and debris, embodying resilience and transformation. Recycled objects are artistically integrated, creating a symbolic and grotesque expression that critiques consumerism's impact. The urban setting is enhanced with creative lighting effects to emphasize upcycling and creative renewal."
    },
    {
        styleName: "plastic bag-shaped",
        imageSrc: "images/bpsgCqHXHH-BkyytW-_CM8M0fVfEGx3FDVO-agyS2WY.jpg",
        prompt: "{[a Khmer girl]} figure, Plastic bags-shaped, Environmental consciousness, Plastic waste, Humanoid form, Intertwined plastic bags, Translucent, Colored, Patterned bags, Textured appearance, Crinkled edges, Torn edges, Hands, Legs, Printed text, Movement, Emotion, Artificial vs. organic, Floating fragments, Urban setting, Natural setting, City street, Landfill, Polluted beach, Reflective qualities, Translucent qualities, Unique texture."
    },
    {
        styleName: "chalk art-Style",
        imageSrc: "images/cdQMIFu6WL0HmBArZOiUh0eXZDAx1micYuKKyT-a0nQ.jpg",
        prompt: "chalk art of {[Animal]} on a black chalkboard, framed, with vibrant and textured chalk lines, realistic, hand-drawn quality, dusty appearance, black and white, depth, dimension, lively composition, engaging, charming."
    },
    {
        styleName: "Optical illusions art",
        imageSrc: "images/Sv_65PBsJrucrq7MfOxziy0Hub5vG14LqOL8tCPim3M.jpg",
        prompt: "Optical illusions art, {[Animal]}, perception manipulation, visual effects, perspective tricks, trompe-l'oeil, geometric patterns, moiré patterns, op art, ambiguous figures, hidden images, surrealism, abstract art, visual distortions, depth perception, 3D effects."
    },
    {
        styleName: "Animal 3D Effect",
        imageSrc: "images/WTrdLFaGOIWPzoQd-Sk22OLbrSzIKCW6xfA3eX9ATTk.jpg",
        prompt: "{[Animal]} peeking out of round wood frame with black background, playful, curious animal, realistic detail, picture frame, surprise element, cute animal, artistic composition, with cement texture wallpaper background."
    },
    {
        styleName: "3D polygonal paper",
        imageSrc: "images/4sV9E2YZZt0dn4xTcj01ySTMp7nHTGeb5lC6ganGoek.jpg",
        prompt: "Whimsical 3D polygonal paper, {cat}, on a paper shelf attached to wall, geometric shapes, playful, artistic, minimalist, wall art, paper craft, colorful, modern decor."
    },
    {
        styleName: "Animal grumpy look",
        imageSrc: "images/OHDaeN1qyjKWXO41nGumsvFR2MCGHcIMd9Rg34foYlA.jpg",
        prompt: "Grumpy {rooster}, messy hair, long beard, striped pajamas, slippers, coffee mug, messy room, window background."
    },
    {
        styleName: "Complicated facial contours",
        imageSrc: "images/My4fVN8lVbRnxaIywtkosyP5Tble5jmF7s3onSpllu4.jpg",
        prompt: "Pattern-style {cat}, stylized, colorful, complicated facial contours, geometric, abstract elements, intricate designs, mechanical motifs."
    },
    {
        styleName: "shadow box LED",
        imageSrc: "images/BCbNZHfy1VAmrgN_UDoGt2xMUaa8CiJlk9ejyodmHIU.jpg",
        prompt: "shadow box, {Dogs and cats sitting in a room}, decorative LED lightbox, layered paper art, illuminated design, intricate details, soft glow, artistic decor, night light."
    },
    {
        styleName: "Mechanical sculpture",
        imageSrc: "images/O0v7TFCU_maObmpMP9BV5XttTUFq0FGd1Z6PhpNeuSA.jpg",
        prompt: "Mechanical {cat} sculpture with intricate design, gears, metalwork, steampunk style, industrial art, detailed craftsmanship, and moving parts."
    },
    {
        styleName: "Smoke art",
        imageSrc: "images/VoT7kaNuw7CJtPYNPbm3TTxkJU-SJTrBxuwMTY-lOAQ.jpg",
        prompt: "Smoke art of {a cat}, with wispy patterns, abstract design, ethereal, flowing shapes, monochrome, delicate artistic swirls, smoke trails."
    },
    {
        styleName: "Bonfire smoke art",
        imageSrc: "images/ftMhQ1KovSRCY4Sxak51T0NjyuiZH6OhyP-JSjiLgLM.jpg",
        prompt: "Bonfire with smoke art of {tiger}, swirling patterns, ethereal textures, abstract design, flowing shapes, artistic composition, dark background, atmospheric, natural elements."
    },
    {
        styleName: "Mechanical Art",
        imageSrc: "images/PEsnexhK_dZneec0ybHyUhPTg-uYSfCs-35OWOP0LI8.jpg",
        prompt: "A mechanical {a girl with tiger} with intricate gear designs, metal components, and a steampunk aesthetic."
    },
    {
        styleName: "Silicone mold-style",
        imageSrc: "images/WIC2b9UpYeZPWoiAcHOaOvfgYndicRpth5V9EEdfFAI.jpg",
        prompt: "Silicone mold, {Animal}, flexible material, detailed design, smooth texture, casting mold, intricate patterns, crafting tool, soft rubbery."
    },
    {
        styleName: "across frames-style",
        imageSrc: "images/-iXw9Qt5WhZThV_bkVsueneLl_3cJL6Jw8EWMRvK6rw.jpg",
        prompt: "Three black frames with white background, each frame containing a section of {a motorcycle} photo divided across the frames to form a complete image when viewed together, Attach to the wall with a gray wooden wall in the background."
    },
    {
        styleName: "flip-flops pattern Design",
        imageSrc: "images/Tm0WZvOQKW2YcayJlYqYvmWgBJmeMd0H1q7UecZZJWU.jpg",
        prompt: "A pair of flip-flops, {dog} with Khmer Art Patterns, cut out, the flip-flops are white color and the pattern is black, top view."
    },
    {
        styleName: "Sandstone-Style",
        imageSrc: "images/sMColRjdzkZ9mwgYFwWx9GbZ0N0M4KNJwpgJi8q2dvU.jpg",
        prompt: "Sandstone, {wildlife sculpture}, natural texture, earthy tones, layered rock, rustic, organic design, geologically detailed patterns, sedimentary rock."
    },
    {
        styleName: "Old tires-style",
        imageSrc: "images/0GnWarUyOIbxFke7QCRnn5N2ilEaQNa5W6UIinjCifs.jpg",
        prompt: "Old tires, {wildlife sculpture}, weathered texture, rubber, recycling, rugged, abandoned, worn-out, industrial, grungy, stacked tires."
    },
    {
        styleName: "Bag-Wallet Design",
        imageSrc: "images/OHhmHlLsJaAkeXsfDMz1FdYyLtmS6Ft0N7O3ZOVmhqI.jpg",
        prompt: "[bag/wallet], {{Animal}}-shaped, cute design, fabric, whimsical."
    },
    {
        styleName: "Bag-Wallet Design 2",
        imageSrc: "images/ZxwZKhU3FXkZCUpdPOz2UuHlyutJLjcQB1NPsBSBLPY.jpg",
        prompt: "{{cat}}-shaped leather Clutch Wallet, handcrafted design, whimsical accessory, animal-themed purse, unique leather goods, playful fashion item."
    },
    {
        styleName: "Breaking wall-style",
        imageSrc: "images/Yyyl4L0OP3o4rGSM0-X0xYnY4Fn9ptJAg6P8QYYKGBs.jpg",
        prompt: "realistic Breaking through a stone wall, dramatic impact, forceful, dynamic movement, debris, destruction, strength, power, action, dramatic, wall sticker, {{a tiger}}."
    },
    {
        styleName: "Wall decoration art",
        imageSrc: "images/r6s4NZWe8jTSsVYqO1VtTZLBS3XAROKA2USBEOmBgAg.jpg",
        prompt: "Wall art print, {{Animal}}, modern design, vibrant colors, abstract, framed, stylish decor, artistic, home interior, detailed patterns, contemporary."
    },
    {
        styleName: "Name card design",
        imageSrc: "images/BEOJ9PbSgWIBPJrM6ALYDZoBjsy3IuVYxUlGBT7fD6w.jpg",
        prompt: "Name card design of {{Fragrance Store}}, professional, minimalist, sleek, modern, typography, branding, contact information, creative, elegant."
    },
    {
        styleName: "Animal head wall decor",
        imageSrc: "images/E8MSjGvgbc4Zyn0KUEQGRiStoBwkyxYUQPuQyYsQ0kQ.jpg",
        prompt: "head wall decor, realistic, artistic, mounted, detailed features, rustic, natural materials, stylish, home decoration, {{Animal}}."
    },
    {
        styleName: "Collage Mixed media",
        imageSrc: "images/MSqxBJIsaoRs36K6252O2kBRGmmbrCPmSAGTNMP_BiU.jpg",
        prompt: "Collage Mixed media, {{Animals}}, Layered textures, Cut-out shapes, Overlapping elements, Vibrant colors, Textured, Paper-like, Handmade feel, Artistic composition."
    },
    {
        styleName: "Draw with thread-Colorful",
        imageSrc: "images/ahlxY8RdKyjKceK7MYD5YS7ysolGF8AfD1OEHjNos0I.jpg",
        prompt: "Draw with thread, string art, intricate patterns, detailed design, embroidery, textile art, colorful threads, artistic craft, handmade. The expressive artwork is round framed in natural wood, on the pedestal stand, {{a girl}}."
    },
    {
        styleName: "Gouache Painting",
        imageSrc: "images/uLBOAMufIKm2saDcsmCXOcTQuTYRbCwoo3xoELdz1kQ.jpg",
        prompt: "Gouache, {{Animals}}, Opaque, Matte finish, Bold colors, Thick brushstrokes, Smooth gradients, Oil paint textures, Luminous, Layered, Hand-painted."
    },
    {
        styleName: "Fresco Painting",
        imageSrc: "images/bWfAgOrdv7tcjF-jWGw2jdq3yPTsMWQsVGjMp12gyTM.jpg",
        prompt: "Fresco, {{Animals}}, Wall painting, Ancient technique, Earthy tones, Plaster texture, Natural pigments, Layered, Weathered look, Historical, Hand-painted."
    },
    {
        styleName: "Mosaic Painting",
        imageSrc: "images/LcF-2y3wSh6NA33ChXH1ymL4s7BuSTzyhKOyocleRU8.jpg",
        prompt: "a mosaic-style painting of {{Animal}}, using glass tiles and stones to depict the vibrant colors and textures, framed."
    },
    {
        styleName: "Nihonga Painting",
        imageSrc: "images/rVGR1hr5YcJE1bf530GrtcuCsITM5uQ2XIudNdgHDXk.jpg",
        prompt: "japanese nihonga painting about {{a girl}}, Nihonga, ancient japanese painting, intricate, detailed."
    },
    {
        styleName: "anime drawing",
        imageSrc: "images/WZCLWWdy5eayibVBGkkY8_aZnYIEOQszh_F_TggHHRg.jpg",
        prompt: "digital art drawing, illustration of {{Animal}}, anime drawing/art, bold linework, illustration, cel shaded, painterly style, digital art, masterpiece."
    },
    {
        styleName: "oil painting-portrait",
        imageSrc: "images/CRxThqMNCgO9c04w5P489x4Zd5MHa-M-tVLsf8QzWJ0.jpg",
        prompt: "Oil painting, smooth glazing skin, detailed impasto clothing, muted earthy palette, softly blended background, visible brush strokes hair, (young Khmer woman)."
    },
    {
        styleName: "T-Shirt Design",
        imageSrc: "images/_GtGGVeabD7g9DcbpJMgc_nT9mCdkpuUKuIA1JtYo0I.jpg",
        prompt: "T-shirt design, trendy, graphic, stylish, bold patterns, vibrant colors, creative, fashion, casual wear, unique artwork, (Leonardo DiCaprio)."
    },
    {
        styleName: "Bauhaus-style poster 2",
        imageSrc: "images/C3q73xw7EDlxkWIJ9WQJQhP1WwixrTtm2dDJ1BYJdZM.jpg",
        prompt: "Bauhaus-style poster, geometric shapes, primary colors, minimalist, abstract design, bold typography, modern, artistic, clean lines, functional, vibrant colors, creative, Framed, (a Khmer girl)."
    },
    {
        styleName: "Living Room design",
        imageSrc: "images/kK1IQ2l0KXH78v9P0qy7VeKGSxjQn5KRc-_FKcCE6u0.jpg",
        prompt: "Animal-shaped living room design, creative interior decor, whimsical furniture, ([Cat])-themed layout, unique home design, playful living space."
    },
    {
        styleName: "bedroom design",
        imageSrc: "images/L2HNk8TYc_Jl7LBUFvt1Io87W03pxVRy_awmed9fIUo.jpg",
        prompt: "animal-shaped bedroom design, creative interior decor, whimsical bedroom layout, ([Cat])-themed furniture, unique room concept, playful sleeping space."
    },
    {
        styleName: "Kitchen design",
        imageSrc: "images/T_Y8aLtogeSzAtdEDNm0lo2xw4pcCMk8Pmf7B2VlkJ8.jpg",
        prompt: "Animal-shaped kitchen design, creative interior, playful kitchen layout, ([Cat])-themed cabinetry, unique home decor, whimsical cooking space."
    },
    {
        styleName: "Shop Design",
        imageSrc: "images/CfmeHUvRQpM3Op3teytfgjYONRabn59dUn3-c3d6vsE.jpg",
        prompt: "Animal-shaped shop design, whimsical, creative architecture, vibrant colors, eye-catching, playful, themed storefront, detailed features, lively atmosphere, unique entrance, urban street setting, inviting facade, ([Cat])."
    },
    {
        styleName: "Palm tree-style",
        imageSrc: "images/Fd0DX1gtmP8VojYjP9B-T453d8rXJLiuEVg7DaD8GyI.jpg",
        prompt: "Made of palm tree, ([Animal]), natural materials, palm leaves, palm wood, eco-friendly, tropical, rustic, organic, handmade, sustainable."
    },
    {
        styleName: "Coconut shell-style",
        imageSrc: "images/EKuYGA-EODRAHTwzCgcNwPHKO5UMeHKAcx3gEnRoAqA.jpg",
        prompt: "Coconut shell, ([Animal]), natural texture, brown, tropical, open shell, rustic, organic, detailed, beach, tropical fruit. on pedestal."
    },
    {
        styleName: "coconut shell",
        imageSrc: "images/x5bFKynE4iM0PQdLQ1u0S2hx2xX_LWPmL1sjzMhJ2HY.jpg",
        prompt: "Animal-shaped coconut shell, creative natural craft, whimsical coconut carving, ([Cat])-themed decor, unique handmade art, imaginative coconut shell design."
    },
    {
        styleName: "Sand Art",
        imageSrc: "images/I2Eptavrwbf_fwj-pic1htK3p0DRGs3qJkVnhqDLPjM.jpg",
        prompt: "Sand art, intricate designs, natural material, beach, detailed patterns, ephemeral, textured, creative, artistic, sand sculptures, ([Animal])."
    },
    {
        styleName: "Indian henna designs",
        imageSrc: "images/YhJoIYG5rdrEaJpxNWtCRIZEU5P39xUR84KnZLeWdKg.jpg",
        prompt: "Indian henna designs, ([Animal]), intricate patterns, traditional, cultural, hand art, mehndi, detailed, floral motifs, symmetrical, festive."
    },
    {
        styleName: "Rain art-style",
        imageSrc: "images/Q94-OG4-pE_VQUNdGG8KIbK6dssBfaIDDkeMoJWfgBw.jpg",
        prompt: "Rain art, ([Animal]), abstract, watercolor effect, wet surface, reflections, rainy day, artistic, nature, atmospheric, urban."
    },
    {
        styleName: "Flame-style",
        imageSrc: "images/KQ01Zlih4kB-ku2ignFMieosoygMc5XK1rd4EsSy5YU.jpg",
        prompt: "{{Animal}}, Flame, fiery, bright, orange and red, dynamic, intense heat, burning, glowing, realistic, fire."
    },
    {
        styleName: "Flame art",
        imageSrc: "images/oCGXMmNeLur_x5Np2ChHCD-xGjCb8YlugzYZaD5Xbs0.jpg",
        prompt: "Flame art, fiery, abstract, vibrant colors, dynamic shapes, glowing, artistic fire, intense heat, creative design, {{Animal}}."
    },
    {
        styleName: "Wall art print",
        imageSrc: "images/vLZhsY0wXqtlaq2mJGZFAbkt-97J19ZzC70lmdE0PEo.jpg",
        prompt: "Art print, high-quality, detailed, vibrant colors, framed, stylish, artistic, contemporary, home decor, modern design, {{Animal}}."
    },
    {
        styleName: "Flower-style",
        imageSrc: "images/a1TXTOJCbcohLT7J3vQfRFrWZz14fiw2C5insS2WWjE.jpg",
        prompt: "Made of flowers, {{Animal}}, floral arrangement, artistic, intricate design, natural materials, vibrant colors, delicate petals, creative, botanical, elegant, On disk."
    },
    {
        styleName: "Idol-style",
        imageSrc: "images/8BTVsv0hkrtbx4V8GhSLDMFjDsVjPoiS_urjEoW6zq4.jpg",
        prompt: "An idol representing {{a Khmer girl}}, embodying the essence of a deity, with religious and spiritual symbolism, sculpted to reflect divine worship, sacredness, and cultural heritage."
    },
    {
        styleName: "Pottery-style",
        imageSrc: "images/y7FPEihrWYqcGHu_0icEnzPIq0O5OzozW4L6POB8vPw.jpg",
        prompt: "Pottery, handmade, ceramic, clay, artisanal, wheel-thrown, glaze, kiln-fired, decorative, functional, {{Animal}}."
    },
    {
        styleName: "Polymer clay-style",
        imageSrc: "images/GTvw5FOGxqoYpT-HlGpXhR5o7WjaIxblrt2v6MVSjs4.jpg",
        prompt: "Polymer clay, {{Animal}}, vibrant colors, sculpting material, handmade, detailed, artistic, flexible, creative, versatile, miniature."
    },
    {
        styleName: "Clay-style",
        imageSrc: "images/3PYnm6xeYl8owE39Xf3XHmsjxa0vyhMwApzsPzdkroU.jpg",
        prompt: "Clay, {{Animal}}, earthy, sculpting, natural material, handmade, pottery, ceramic, artistic, molding, textured."
    },
    {
        styleName: "Walnut Shell Art",
        imageSrc: "images/R0AO_ECRQ1cvDMEtxVkxz4WNyp5ZEjwjeBLlkgZpNHY.jpg",
        prompt: "Walnut shell art, miniature, creative, intricate details, handcrafted, decorative, natural material, eco-friendly, imaginative, {{Cat}}."
    },
    {
        styleName: "Pebbles art",
        imageSrc: "images/2-xc6YQq0ta4UUgAfG1ndwJ2H37REcO0bSZeXJnvoaM.jpg",
        prompt: "Pebble art, {{Cat}}, creative stone arrangement, intricate rock designs, natural material art, detailed stone mosaic, whimsical pebble sculptures."
    },
    {
        styleName: "Emerald-style",
        imageSrc: "images/8gLLwyofvMd6E00jMU24MxRbs1w0DSq7mUDyKKMFRH4.jpg",
        prompt: "{{a cat}} Made of emerald, gemstone, green, precious, jewelry, polished, shiny, luxurious, natural, elegant."
    },
    {
        styleName: "Ruby-style",
        imageSrc: "images/ggHOvTzI5WKxXVMJKm_q6BCm2nDF5BQf9l5-ZkRroHc.jpg",
        prompt: "Made of ruby, {{a cat}}, gemstone, red, precious, luxurious, shiny, jewelry, polished, elegant, vibrant."
    },
    {
        styleName: "Sapphire-style",
        imageSrc: "images/fAWXE8Rxw5mmo7GnMKmXg_2yBvVYzGXLswC4u4fjw4A.jpg",
        prompt: "Made of sapphire, {{Animal}}, gemstone, blue, precious, luxurious, shiny, jewelry, polished, elegant, vibrant."
    },
    {
        styleName: "Jadeite-style",
        imageSrc: "images/DOkT95a_5p1GOzyu8jr0O-LIqq05_vpdTKpARdwHbzk.jpg",
        prompt: "{Cat}. Made of jadeite, gemstone, green, precious, luxurious, polished, shiny, jewelry, elegant, intricate."
    },
    {
        styleName: "Money-style",
        imageSrc: "images/WQpjrWuoBbtu-wrf5lVq2ZNeliZMVdMAr9kd5-LI-jE.jpg",
        prompt: "Made of money, {Cat}, dollar bills, cash, intricate, creative, financial, artistic, paper, wealth, unique."
    },
    {
        styleName: "paper cutting silhouette",
        imageSrc: "images/V0CkQ8XoB560T3ICf09lKJXe9OaND-KzbBBGEk0bYHI.jpg",
        prompt: "{cat} Intricate paper cutting silhouette, detailed handmade design, delicate paper art, black and white cutout, artistic shadow shapes, traditional paper craft."
    },
    {
        styleName: "Throw water art",
        imageSrc: "images/kTHNbOpzyVKJs78QFN02FSFMFd_s86pyJcDjnqPTwXI.jpg",
        prompt: "Animal-shaped water splash artwork, dynamic water art, creative splash forms, animal-themed water shapes, imaginative fluid design, artistic water sculpture, {cat}."
    },
    {
        styleName: "Product sketching",
        imageSrc: "images/d6amRr0rOvLZleW866IZhvnSZw7GKMVRpSg0pnZsRRs.jpg",
        prompt: "Product sketching, detailed, design concept, pencil drawing, technical, innovative, creative, blueprint, precise, illustrative. {a cup}."
    },
    {
        styleName: "Room design",
        imageSrc: "images/XGn_D0EX-FoQ8YQ5U1b7ZD-_Rv_S7QV44VfpamZzSeU.jpg",
        prompt: "animal-shaped room, creative interior design, {cat}-themed space, whimsical decor, unique room layout, imaginative living area."
    },
    {
        styleName: "Cardboard Three-dimensional",
        imageSrc: "images/n8B1mG4ehEGUODkK3gr-NupRiYUEjhA4o4NrPqizxXk.jpg",
        prompt: "Three-dimensional, Cardboard {bear} head, Mounted on wall, Floral wallpaper background, Interlocking pieces, Crafted appearance, Geometric appearance."
    },
    {
        styleName: "Stylized artistic sculpture",
        imageSrc: "images/qZoFfah4C7o_GCr6IkO_BIJeMAlR5_FR2iN6uVMdPCk.jpg",
        prompt: "Stylized artistic sculpture, abstract, modern art, intricate design, minimalistic, fluid shapes, bold colors, contemporary, dynamic composition, natural lighting, peaceful ambiance, surrounding greenery, {cat}."
    },
    {
        styleName: "strawberries-Style",
        imageSrc: "images/8j_Bh76-HX61vFUsxDrGFUCqBAwMR91oENONqWnquD4.jpg",
        prompt: "{dog} made of strawberries, Green leafy wings, Green leafy Hair, Perched on moss-covered branch, Lush forest, Friendly expression, Looking curiously, Strawberry beside it."
    },
    {
        styleName: "vehicle Wooden body",
        imageSrc: "images/29Hc2tTJHG0AeHVGEZv4rbcIIlm444xGEyF2OqueRCQ.jpg",
        prompt: "{Porsche 550 Spyder} with Wooden body, rustic, wooden texture, unique design, natural materials, detailed, handcrafted, eco-friendly, innovative, artistic."
    },
    {
        styleName: "vehicle-style",
        imageSrc: "images/w5NUMdtxvrirEqqOsxnZ-D-ogy0Fj1Tlo4J9i9jhMlY.jpg",
        prompt: "modern design, high-resolution, large off-road tires, sleek, photorealistic, lifelike, advanced technology, automotive, precise, perched on road in forest, {Toyota Camry}."
    },
    {
        styleName: "Pixar-style",
        imageSrc: "images/8TV08tlbGGEIQ38bE0Qrxylf401gcKPKXXOB8ItuxMc.jpg",
        prompt: "Cheerful Pixar-style {character}, round face, big expressive eyes, friendly smile, colorful outfit, playful demeanor, animated and lively, magical background, warm and inviting atmosphere."
    },
    {
        styleName: "Realistic monster-style",
        imageSrc: "images/A_YJFRaoH8zvbgNaK-hkL5mGpBCwhGuWyM8UKm1Ze9E.jpg",
        prompt: "Realistic monster, {Animal}, detailed, lifelike, terrifying, intricate textures, sharp features, menacing, high-resolution, photorealistic, creature design."
    },
    {
        styleName: "Realistic alien-style",
        imageSrc: "images/3m1ZA_I1S8kt5bwdumDogLuxLOMRnjLM4JLkTKXQhmY.jpg",
        prompt: "Realistic alien, {Animal}, detailed, lifelike, otherworldly, intricate textures, humanoid, high-resolution, photorealistic, extraterrestrial, advanced technology."
    },
    {
        styleName: "Security camera screen view",
        imageSrc: "images/cuoOmq_6-ITLZwXVOUR8_pzXp7V5HxR4J_lc8vdZfa8.jpg",
        prompt: "Resembling security camera view, {surveillance screen, camera feed, live footage, black and white, timestamp, CCTV.}"
    },
    {
        styleName: "Hot wheel Racing",
        imageSrc: "images/WAflmWqvX09zloGEEZkYAft9LtsoWPTwAMdumWeO5Ig.jpg",
        prompt: "Hot Wheels Unleashed 2 {Lamborghini Espada} Racing: Vibrant action, miniature cars, high-speed track, dynamic angles, {Jungle river edge}, detailed design, loop-de-loops, blazing tires, childlike excitement, competitive race."
    },
    {
        styleName: "Hot Wheels Collection",
        imageSrc: "images/FYci37-X6eF2pYuBKJkLKvctQf6Y1O_7-ukjSE6BGg4.jpg",
        prompt: "A hand holding a Hot Wheels car with a blue and red box. The car is a Volkswagen Beetle with the words 'New for 2024' written on the box. There are other Hot Wheels cars in the background. The background is blurry."
    },
    {
        styleName: "digital painting-Style",
        imageSrc: "images/LQ3V1Sep_1bWPccAun4ZOpUIul_dwXdGpTp1zOMvmeY.jpg",
        prompt: "Digital Painting Style, {Animal}, Soft brush strokes, vivid colors, detailed textures, ethereal ambiance, creative composition, painterly look, layered hues, artistic rendering, smooth gradients, dynamic lighting."
    },
    {
        styleName: "Forza Horizon 5 racing",
        imageSrc: "images/spZmUQTeX1Lc3HXYFIlayFGP26W3GEVjoykWQlSeYOc.jpg",
        prompt: "Forza Horizon 5 Racing, Realistic graphics, high-speed cars, dynamic action, detailed textures, vibrant lighting, open-world racing, adrenaline rush, motion blur, competitive atmosphere, exotic locations. {Lamborghini}."
    },
    {
        styleName: "DIRT 5 racing",
        imageSrc: "images/74Uqxg8Y6hiAcGpwAzkOG9jWhhGre7mQM6eFY77kzW4.jpg",
        prompt: "DIRT 5 {Lamborghini} Racing: Off-road excitement, rugged terrain, dynamic action, detailed vehicles, {Boreal forest} tracks, motion blur, bright colors, intense competition, realistic dust effects, adrenaline-filled race, vibrant landscapes."
    },
    {
        styleName: "DIRT RALLY 2.0 racing",
        imageSrc: "images/QFA0qXrV7MYrv7WMLTdazkU65fowXZUiEEqKg1A90D0.jpg",
        prompt: "DIRT Rally 2.0 {Lamborghini} Racing Game: Intense off-road racing, realistic graphics, detailed rally cars, rugged terrain, dynamic action, {muddy} tracks, sharp turns, dust clouds, competitive atmosphere, motion blur, gritty visuals, adrenaline rush."
    },
    {
        styleName: "Minimal Style",
        imageSrc: "images/8pq1WLq8fVAWuHirpAfq-O0IFbDZoPz_bCrHg8tmj7Q.jpg",
        prompt: "Minimal black and white illustration, simple lines, clean design, high contrast, artistic style, sprinkles for hand coloring. There should be an empty white background, no shadow. {a girl}."
    },
    {
        styleName: "Pixar Character",
        imageSrc: "images/2TFMFpJWLYOzuHBNj5ZDY4M_6txuG3CSqB8aiiDMRNg.jpg",
        prompt: "Pixar-style character, colorful, animated, expressive, {a man and his wife and daughter, living room}."
    },
    {
        styleName: "Pixar Animals",
        imageSrc: "images/TD1-Zl5mC6zBMh-87AYfkloarhEgSLqwyTUpSuMHsh0.jpg",
        prompt: "Pixar-style animals, {Cat with its owner}, cute, cartoonish, lively."
    },
    {
        styleName: "Pixar Fantasy",
        imageSrc: "images/2kHqFu82cpWsCtziudW3RvP1psT3xPt96DtcEZSRX4w.jpg",
        prompt: "Pixar-style fantasy world, Jungle, magical, enchanting, vivid, {a girl}."
    },
    {
        styleName: "Modern Condo design",
        imageSrc: "images/pUWhmAd_qcmz8fSeEpBcOcrOxn-PV3EmYTUgrurqNBo.jpg",
        prompt: "{cat}-shaped modern condo, creative architecture, animal-themed building, unique residential design, whimsical urban living, innovative condo exterior."
    },
    {
        styleName: "MotoGP design",
        imageSrc: "images/-xloTnH5yyjadlxwcff8GPdKOkabyqAwg2nqNt_QrGI.jpg",
        prompt: "Animal-shaped MotoGP bike, creative racing motorcycle, {Tiger}-themed sportbike, high-performance whimsical design, unique race bike."
    },
    {
        styleName: "Motorcycle design",
        imageSrc: "images/2anmeTGAa8f4Q4K6fBPTRHSVq6MeVudXgbnyBEKxhTA.jpg",
        prompt: "Animal-shaped sportbike, creative motorcycle design, {Cat}-themed superbike, unique sportbike, imaginative two-wheeler, whimsical high-performance bike."
    },
    {
        styleName: "Futuristic Animal robot",
        imageSrc: "images/p6czy-V9ZYFEYH5k-mC_YFiUi_oqKxRAj9mVhezgjlk.jpg",
        prompt: "Animal-shaped futuristic robot, {cat}, innovative design, sci-fi mechanical creature, high-tech animal robot, imaginative robotics, advanced technology."
    },
    {
        styleName: "Fallout 4 Car-style",
        imageSrc: "images/FOBCH2m35_h7wYoUAV0KdETj4dnZe_GQxRMCftj51Pk.jpg",
        prompt: "Post-apocalyptic {car} from Fallout 4, rugged design, rusty metal, retro-futuristic aesthetic, and wasteland details."
    },
    {
        styleName: "Kids Car",
        imageSrc: "images/hrb3_6yu5qRD5mibunBAYkjb9CYv-ZOlGYMs6NyF7hI.jpg",
        prompt: "realistic toy car for Khmer kids, {Lamborghini}, playful environment, happy child driving."
    },
    {
        styleName: "office design",
        imageSrc: "images/BgZYCvfCatzZwQuWwhYrSRfeDYeLlG03T6UmMQm5rDg.jpg",
        prompt: "Animal-shaped office design, {Tiger}-inspired, sleek lines, cozy nooks, feline theme, eco-friendly materials, whimsical aesthetics, innovative architecture, nature integration, ergonomic layout."
    },
    {
        styleName: "warrior suit",
        imageSrc: "images/jj6TNhdaijmsvdHAAWZZi2z_E0tejtuG_VuYpbtPyXw.jpg",
        prompt: "{Animal}-shaped warrior suit, detailed armor, fierce and powerful, tribal designs, earthy tones, battle-ready."
    },
    {
        styleName: "Graphic novel-style",
        imageSrc: "images/3y2vrVab6Lf_Gn2moPglVGbiBdmSWV8KGLz0raWEc70.jpg",
        prompt: "Graphic novel, bold outlines, dramatic look, narrative, vivid colors, comic book style, action-packed, dark tones, cinematic, intense."
    },
    {
        styleName: "Woven Bamboo House Design",
        imageSrc: "images/voBqHyPld-ZzhAWqeuIYI6IDv4gadcY9oxx4AhZ64mk.jpg",
        prompt: "Intricate Woven Bamboo {cat}-Shaped House Design, Eco-Friendly Bamboo Architecture, red joints, Crafting Animal Figures with Sustainable Materials."
    },
    {
        styleName: "Woven Bamboo Home Deco",
        imageSrc: "images/zdbO5bTtDq9a1FD221zX6jIpBqd2bRsMERp9ASEp6H4.jpg",
        prompt: "Eco-Friendly Woven Bamboo {Animal}-Shaped Home Decor, Intricate Bamboo Art Pieces, red joints, Sustainable Animal Figurine Decoration."
    },
    {
        styleName: "Straw House Design",
        imageSrc: "images/Jr0SyLdf6KfMe5KkMJoIKMYDrwTvm3eFgBsNZqkBak4.jpg",
        prompt: "Straw {Animal}-Shaped House Design, Eco-Friendly Straw Architecture, red joints, Unique Animal Figures with Natural Straw Materials."
    },
    {
        styleName: "woven bamboo building",
        imageSrc: "images/Lzmsfx29rX5ITrCr4BaPkn6JbWe5HUN9mLOoLbRkAyo.jpg",
        prompt: "{Animal}-shaped woven bamboo building structure, intricately designed, natural materials, architectural marvel, eco-friendly construction, forest background."
    },
    {
        styleName: "skeleton Art",
        imageSrc: "images/ox9xHdULK-WkYj9rzObfXkRtwNpy5AZZIYk3U5SKbmg.jpg",
        prompt: "{ young Asian woman} skeleton, black frame, ornate gold corners, central focus, facing camera, black background, blurry white wall background, signature Veasna."
    },
    {
        styleName: "Vehicle skeletal",
        imageSrc: "images/fH16O64SzN2CJgLU6GSkMQXvJXuPf-SX2WfnfCajHPg.jpg",
        prompt: "A futuristic, small, black and white electric Lamborghini SC18 with a skeletal frame. The car has a single seat with a black leather seat. The car is on a Vegetated area background."
    },
    {
        styleName: "Pebbles art",
        imageSrc: "images/1trw3ZUe8RA2gN_gi3Dz7LS8XQmra_b8AiFMFRl6AAM.jpg",
        prompt: "A detailed portrait of a French Bulldog made out of pebbles and stones on Sand. The pebbles are arranged in a realistic fashion and create a sense of depth and texture. The background is very simple and helps to emphasize the image."
    },
    {
        styleName: "architectural drawing",
        imageSrc: "images/lPPgylVZqdAO_YfRDBI7EW9bYsjZjZFxCH7FYRwSCdI.jpg",
        prompt: "Modern house cutaway view: Art Deco house design with dark walls, wooden panels, large glass windows, and flat roof with solar panels. Interior: living room, kitchen, bedroom, bathroom. Exterior: garden, elongated pool, steps. Include floor plans, architectural drawings, cross-sections, site plan. Logo: 'Design by VEASNA' bottom right."
    },
    {
        styleName: "Animal head wall decor 2",
        imageSrc: "images/iyGvOPgFfJHrQaCJNCL5_u7N1RVtKOv3Ay-nzoHNsOY.jpg",
        prompt: "A realistic and detailed image of a majestic deer head mount displayed on a wooden wall. The mount features an intricately designed plaque, highlighting the texture of the animal's fur, scales, or feathers. The lighting should accentuate the lifelike qualities of the mount, giving a sense of elegance and tradition."
    },
    {
        styleName: "kids clothes design",
        imageSrc: "images/s9tTJVyYZ8E1OvaAr8K7c2vlljLYwwv5ppinwnENjwo.jpg",
        prompt: "Naga Serpent-shaped kids clothes design, incorporating playful and imaginative features, vibrant animal prints, soft and comfortable fabrics, creative embellishments, Cartoon-Like animal faces, colorful and whimsical patterns, child-friendly fastenings, themed outfits for play and adventure."
    },
    {
        styleName: "whimsical bookshelf",
        imageSrc: "images/gm1IuPr2s3pDqfxv6MFc5ghprsje8uTJnOJ4dhMqSa4.jpg",
        prompt: "A whimsical, Cat-shaped bookshelf crafted from light oak wood, mounted on a wall in a living room. The bookshelf displays a variety of colorful books and small potted plants."
    },
    {
        styleName: "3D anaglyph",
        imageSrc: "images/T5UtnOPC_ppMwpaLc2jtZ3QWeg6CMSdnJ7Oj7DTfmTc.jpg",
        prompt: "Young Asian woman in water, 3D anaglyph, red and blue, 3D glasses"
    },
    {
        styleName: "3D render",
        imageSrc: "images/wYQUTljFvopYB8NmPbhkksYbi8KJCT9ie18Ji4KMiHM.jpg",
        prompt: "Young Asian woman in water, 3D render, computer generated, realistic 3D"
    },
    {
        styleName: "8-bit art",
        imageSrc: "images/WP0yrH34GMi-tPbH72G4ZI2Hs27Pw3Q9ZFwT8aZggXQ.jpg",
        prompt: "Young Asian woman in water, 8-bit art, pixelated, video game style"
    },
    {
        styleName: "Abstract design",
        imageSrc: "images/H73o9SlIlXISlYMXbPHr1J3TCWPYCd57Wg1q8NGN3VE.jpg",
        prompt: "Young Asian woman in water, Abstract design, enigmatic forms, conceptual style, avant-garde"
    },
    {
        styleName: "Abstract style",
        imageSrc: "images/KUxa0UxNjZl5Z43xOEv91fpnAY-g0V5ZUM695vxXRcA.jpg",
        prompt: "Young Asian woman in water, Abstract style, non-representational, shapes and colors, artistic"
    },
    {
        styleName: "Aerial photo",
        imageSrc: "images/dL2Qu_xNhKw1dCOTaqk-k2s9rFjjNEsJAE7VCxZd7Gs.jpg",
        prompt: "Young Asian woman in water, Aerial photo, bird's eye view, high altitude, wide perspective"
    },
    {
        styleName: "Alternate history",
        imageSrc: "images/hU4A8hhSAdCyoWp1MEG7DF-zmOsnm3do96FKODEIm2k.jpg",
        prompt: "Young Asian woman in water, Alternate history, reimagined past, speculative fiction"
    },
    {
        styleName: "Ambrotype",
        imageSrc: "images/Aua1ISnlSbwVIVyUzfhVYrC1zw0r-KZckCXcNxKGVn8.jpg",
        prompt: "Young Asian woman in water, Ambrotype, early photography, glass plate, historic effect"
    },
    {
        styleName: "Art brut",
        imageSrc: "images/wjKyW0vEIg6rPuqJxkj91sG1D2PzTQPtC2gq2MxmEl8.jpg",
        prompt: "Young Asian woman in water, Art brut, raw creativity, outsider art, untutored talent"
    },
    {
        styleName: "Art deco",
        imageSrc: "images/HqJkFscSKTYju4shjc2ssiHBvJcajOYxyvj4AMm2wfU.jpg",
        prompt: "Young Asian woman in water, Art deco, 1920s glamour, geometric shapes"
    },
    {
        styleName: "Baroque",
        imageSrc: "images/4L0ii9Gw2pDVoiPAvoupvnA66VEhkSZdHdhFBbazKEk.jpg",
        prompt: "Young Asian woman in water, Baroque, ornate detail, dramatic lighting, rich colors"
    },
    {
        styleName: "Bird's eye view",
        imageSrc: "images/w8O0BX7dBOb5MERUkcab910HTyqYDKZnfQIGb28PnJw.jpg",
        prompt: "Young Asian woman in water, Bird's eye view, aerial, high perspective, wide scope"
    },
    {
        styleName: "Black and white photo",
        imageSrc: "images/hCCR9-ZvJELvrXEJVLjlqO6PdLiriV_VZ2RcqBsKK-s.jpg",
        prompt: "Young Asian woman in water, Black and white photo, monochrome, high contrast"
    },
    {
        styleName: "Caravaggism",
        imageSrc: "images/EZsM8AmhkxT8jG7-dszGVlQhtw1jwdSZ6MzEGdkoBDg.jpg",
        prompt: "Young Asian woman in water, Caravaggism, Baroque art style, intense lighting, realistic detail"
    },
    {
        styleName: "Caricature",
        imageSrc: "images/knvoyerExt-EKgVPPizb77xbXHONPiCHAmLQKBFUiVY.jpg",
        prompt: "Young Asian woman in water, Caricature, exaggerated features, humorous"
    },
    {
        styleName: "Cartoon",
        imageSrc: "images/brE37capIm0WRlogMea9T-TprCpfZWULoBOM5282iew.jpg",
        prompt: "Young Asian woman in water, Cartoon, animated style, hand-drawn, exaggerated"
    },
    {
        styleName: "Cinematic style",
        imageSrc: "images/B6yx06WcB_7HUq0T1ixQBuS-HfyVwmoVkEhx_1RszUE.jpg",
        prompt: "Young Asian woman in water, Cinematic style, dramatic lighting, film-like quality, widescreen aspect ratio"
    },
    {
        styleName: "Classic",
        imageSrc: "images/HFibrq0PepE50xoetGU-Eo7k723BQmpnH_bKUAo2Odc.jpg",
        prompt: "Young Asian woman in water, Classic, timeless, elegant, enduring"
    },
    {
        styleName: "Close-up",
        imageSrc: "images/FJRMyqRdnyF2hfmaFP3N4vR8QT_yfYA-XYKn5lXPDpc.jpg",
        prompt: "Young Asian woman in water, Close-up, detailed, intimate, macro-like"
    },
    {
        styleName: "Cloud design",
        imageSrc: "images/KekOHp0rkIftUWeqQKD-xeZfTAw07JMDqKTDYBfEUTM.jpg",
        prompt: "Young Asian woman in water, Cloud design, mist elements, ephemeral appearance, ethereal themes"
    },
    {
        styleName: "Collage art",
        imageSrc: "images/bGDvze9Xd5_u74np567CAdP5W9xqmPAVihJsw-zoaLQ.jpg",
        prompt: "Young Asian woman in water, Collage art, assembled images, mixed media"
    },
    {
        styleName: "Conceptual photo",
        imageSrc: "images/Y90-IcZo7MZ21WqvVV5Z37C8mkMRDzvX7CRs7g_mw10.jpg",
        prompt: "Young Asian woman in water, Conceptual photo, abstract idea, symbolic elements, artistic interpretation"
    },
    {
        styleName: "Cross processing",
        imageSrc: "images/KdM0EK26xtv0uKl_tw-lml43ZHDTKMpgAW5l8yDYoCA.jpg",
        prompt: "Young Asian woman in water, Cross processing, unconventional color shift, retro look"
    },
    {
        styleName: "Cyber gothic",
        imageSrc: "images/oFcLgGg5ATg7cpIBWY3fucwXIev8PiMr4qczdQPVSs0.jpg",
        prompt: "Young Asian woman, Cyber gothic, futuristic, dark, industrial"
    },
    {
        styleName: "Cyberpunk style",
        imageSrc: "images/YCPhBKEnbVNfTMzOHFVhoPkiDYB2liRNIjsFiAWG6dU.jpg",
        prompt: "Young Asian woman, Cyberpunk style, neon lights, urban dystopia, futuristic elements"
    },
    {
        styleName: "Daguerreotype",
        imageSrc: "images/KU-dUr4pKRSD2u8BFh3sMmGsr7Vh5JCO17rqBSUFtQA.jpg",
        prompt: "Young Asian woman, Daguerreotype, antique photo, silver plate, historical"
    },
    {
        styleName: "Digital art",
        imageSrc: "images/rSMvwI4b7DWzhiTNh7y3Xa5jIVyGmomlBb7rVzLAmjs.jpg",
        prompt: "Young Asian woman, Digital art, computer generated, graphical"
    },
    {
        styleName: "Documentary style",
        imageSrc: "images/lcOy048AtqQnnu3gidDTeVQod6QRvT0lGl7swFnbG_E.jpg",
        prompt: "Young Asian woman, Documentary style, real life, candid moments, storytelling"
    },
    {
        styleName: "Double exposure effect",
        imageSrc: "images/qhRhlLOPH2OKt72bmLWWmc5sAUnfORUoqCM0Xdh4t2w.jpg",
        prompt: "Young Asian woman, Double exposure effect, two overlapping images, artistic"
    },
    {
        styleName: "Dystopian",
        imageSrc: "images/azauflS9qOIsTVbQflOWODead36kAakktqIeju05iM8.jpg",
        prompt: "Young Asian woman, Dystopian, bleak future, oppressive society, dark themes"
    },
    {
        styleName: "Extreme close-up",
        imageSrc: "images/pRVRsIPV7FJZX3ai2on_ANCoNjyoplRbFJ4QCEn2ky0.jpg",
        prompt: "Young Asian woman, Extreme close-up, very detailed, focusing on small area"
    },
    {
        styleName: "Eye level",
        imageSrc: "images/Gd4BxrGuNDgRS2s9fc-4-CtB0yPXtb51KYcgVMCUGWc.jpg",
        prompt: "Young Asian woman, Eye level, neutral view, relatable perspective, direct"
    },
    {
        styleName: "Fairy tale",
        imageSrc: "images/mQ9Pn6Kb-AN7jShCi3Q1yM7a3actY1R68aIxYx1kuGw.jpg",
        prompt: "Young Asian woman, Fairy tale, whimsical, magical, storybook"
    },
    {
        styleName: "Fantasy photo",
        imageSrc: "images/E9t9AMz9Vil6oPUe0utFrDLA-n9F3gaXBepVYL6lXq8.jpg",
        prompt: "Young Asian woman, Fantasy photo, mythical themes, imaginative settings, magical elements"
    },
    {
        styleName: "Film noir",
        imageSrc: "images/l5MiJQF_k-6BoVLYbD6-TWmhXafCgL67WytYKnHk3Co.jpg",
        prompt: "Young Asian woman, Film noir, black and white, moody atmosphere, dramatic shadows"
    },
    {
        styleName: "Fine art photo",
        imageSrc: "images/U7cXpVFEyMwyA7v5rFOk4QliIUiwRSlGddcWcOVic-c.jpg",
        prompt: "Young Asian woman, Fine art photo, artistic interpretation, high aesthetic value"
    },
    {
        styleName: "Fish-eye",
        imageSrc: "images/VEDzbKYffC-JZ3cjc-pXTAGvHGy8OxrK6xZp5M49_vA.jpg",
        prompt: "Young Asian woman, Fish-eye, ultra-wide angle, curved distortions, dramatic"
    },
    {
        styleName: "Fisheye lens",
        imageSrc: "images/0wAvEew0GyxflMyEZXsmivbKSAZs9DJUOvo1VW1Bzu4.jpg",
        prompt: "Young Asian woman, Fisheye lens, wide distortion, bulbous effect"
    },
    {
        styleName: "Flat design",
        imageSrc: "images/qLc9TiiT3B9ELOSwybKCp4kZUZwv0r6s51hbZ7QbLQs.jpg",
        prompt: "Young Asian woman, Flat design, minimal, clean, modern"
    },
    {
        styleName: "Flat lay",
        imageSrc: "images/YaVDLoQPjAwVqBReQXHx8RNRvgwqNsvFBve42lhqEJs.jpg",
        prompt: "Young Asian woman, Flat lay, top-down view, arranged items, organized"
    },
    {
        styleName: "Folk art",
        imageSrc: "images/Ozqv3zk1oMPTr4t_zY_MZt2NGtROu-CNm5-fHy32h1U.jpg",
        prompt: "Young Asian woman, Folk art, traditional, cultural, handcrafted"
    },
    {
        styleName: "Food photo",
        imageSrc: "images/aWqWwHxsWE3IeJC1GlC5vkCjhzVmE_Vz-yr6oRIGiNY.jpg",
        prompt: "Young Asian woman, Food photo, appetizing dishes, styled plating, close-up"
    },
    {
        styleName: "Freeze frame",
        imageSrc: "images/QOphXNGk1azavCZCVlDPGbZI70W_vL1SqPrCGMiLy_c.jpg",
        prompt: "Young Asian woman, Freeze frame, paused action, clear detail, moment in time"
    },
    {
        styleName: "Futurism",
        imageSrc: "images/IjNm8eFIpfu98dSWR2XlMTBXYuBvtVcTJvEwrcvd-Ic.jpg",
        prompt: "Young Asian woman, Futurism, dynamic lines, machine aesthetic, modernism"
    },
    {
        styleName: "Futuristic",
        imageSrc: "images/4NGMbdIDYJP3eRfCibg8k3Lipa3nmbb6Cku04oONpzI.jpg",
        prompt: "Young Asian woman, Futuristic, advanced technology, sleek design, sci-fi elements"
    },
    {
        styleName: "Glamour photo",
        imageSrc: "images/qlVoVHVbVcCAw3S3nlI6nMVn_zBSf__RFawDLLtkcko.jpg",
        prompt: "Young Asian woman, Glamour photo, stylish, beauty shots, flattering light"
    },
    {
        styleName: "Gothic horror",
        imageSrc: "images/XAFBrk_R6Ctg1imNCvDcehPr46nKuww-BcOE-oU8JQo.jpg",
        prompt: "Young Asian woman, Gothic horror, dark setting, haunting themes, vintage"
    },
    {
        styleName: "Hand-drawn animation",
        imageSrc: "images/HfDL9fhFYzjKN9Ws7cLgZJagLeMIRXxZRmlhgXmvOBA.jpg",
        prompt: "Young Asian woman, Hand-drawn animation, traditional, artistic"
    },
    {
        styleName: "High contrast",
        imageSrc: "images/F0iIKuk9-iviOgqYFNUH90uWZo4tExzk5NYIyqVh_DI.jpg",
        prompt: "Young Asian woman, High contrast, strong highlights and shadows, bold colors"
    },
    {
        styleName: "High poly",
        imageSrc: "images/ExS81XPv5jGrhvMiBkVjOkWRMV9xPAJTAjdsFOrQfyY.jpg",
        prompt: "Young Asian woman, High poly, detailed 3D model"
    },
    {
        styleName: "Horror",
        imageSrc: "images/pycDnKekFxdYDtbARV2mGUdogNjAh5CK2XnBS8d5Fx0.jpg",
        prompt: "Young Asian woman, Horror, eerie, scary, dark atmosphere"
    },
    {
        styleName: "Hyper realistic",
        imageSrc: "images/4LKSTPFn6SXVLGvTRqAHRaTY3afU8rGzHW6iertXT48.jpg",
        prompt: "Young Asian woman, Hyper realistic, lifelike detail, meticulous, true-to-life"
    },
    {
        styleName: "Impressionist style",
        imageSrc: "images/LNRvcw5RHGLZOCDRbuuiZ4gzakaf8AMqd0hK7XSxu0E.jpg",
        prompt: "Young Asian woman, Impressionist style, soft focus, painterly effect, vibrant colors"
    },
    {
        styleName: "Industrial",
        imageSrc: "images/qJQH6yZgbnlq8HQh6HPD3SyfMTaRyj6HMYLxOP9ITiA.jpg",
        prompt: "Young Asian woman, Industrial, factories, machinery, urban grit"
    },
    {
        styleName: "Folk art style",
        imageSrc: "images/RWFHyKGHsxWTaP31KjbC3AqNxcZ8Sf9TCfOkl_nxjfk.jpg",
        prompt: "Young Asian woman, folk art style, figure crafted, showcasing traditional, cultural, and handcrafted elements"
    },
    {
        styleName: "Low angle",
        imageSrc: "images/e9F7ziA4OLAm2gO00J7hrGqq_XL-wXDQRNZK0IBasNA.jpg",
        prompt: "Young Asian woman, Low angle, looking up, powerful perspective, dramatic"
    },
    {
        styleName: "Low contrast",
        imageSrc: "images/tqurNbC0aOpQE44g77Y3IBxSwjUL8c_tjGs83wp5UHY.jpg",
        prompt: "Young Asian woman, Low contrast, muted colors, soft tones, gentle transitions"
    },
    {
        styleName: "Low poly",
        imageSrc: "images/4VY-npRYZCN8icQ8_A0z3ED1K--_SWib8mw8u9PmdyQ.jpg",
        prompt: "Young Asian woman, Low poly, geometric, polygon shapes"
    },
    {
        styleName: "Magazine style",
        imageSrc: "images/ZFaumvILDzdO9doD6QYhFeOSEmgMrn5xuieSGskUCwA.jpg",
        prompt: "Young Asian woman, Magazine style, polished, editorial, professional look"
    },
    {
        styleName: "Magical realism",
        imageSrc: "images/bjBpZLnMbPme5x1_6mh_AENZwg2v6udBW9kzR55muuQ.jpg",
        prompt: "Young Asian woman, Magical realism, everyday with magical elements, subtle magic"
    },
    {
        styleName: "Makeup transformation",
        imageSrc: "images/KNZu8-cG8BdHRMt2fyxr9--ZRcfTnJQU39vO5-qEq0k.jpg",
        prompt: "Young Asian woman, Makeup transformation, dramatic change"
    },
    {
        styleName: "Manipulated",
        imageSrc: "images/0u4w9opD5-KGBfmnOjM3WjKzawd5g9iR6bcbHSMtHy4.jpg",
        prompt: "Young Asian woman, Manipulated, digitally altered, surreal"
    },
    {
        styleName: "Masked portrait",
        imageSrc: "images/dsnbJYI33nrRTmkbTsHKwC3VlUax0FHDiUEQRaej7sM.jpg",
        prompt: "Young Asian woman, Masked portrait, concealed identity, dramatic, mysterious"
    },
    {
        styleName: "Medical",
        imageSrc: "images/orWeE_zNl33utvOMdVTniW6Mp4WAV89O6wlXmmiuVKU.jpg",
        prompt: "Young Asian woman, Medical, clinical, healthcare, scientific"
    },
    {
        styleName: "Mid-century modern wedding",
        imageSrc: "images/7Jxhb4WDKT9Q51Xq0gDDA9gey5eZFW8tFf1ufo3HiYM.jpg",
        prompt: "Young Asian woman, Mid-century modern wedding, 1950s-60s, retro"
    },
    {
        styleName: "Minimalist",
        imageSrc: "images/BKTrYJTp1shcTw-CUDtXVzcmRIPipFYDfKrdaqzjCFM.jpg",
        prompt: "Young Asian woman, Minimalist, clean lines, simple composition, few elements"
    },
    {
        styleName: "Mixed media",
        imageSrc: "images/07YGhNxzfhbNvIyB3IgF_jUK3SC9dS64hiApRL6xjpM.jpg",
        prompt: "Young Asian woman, Mixed media, various materials, artistic combination"
    },
    {
        styleName: "Modern",
        imageSrc: "images/EssE-_lXE6VjVv0ziMpyZy4cxDQuP9v11TKTW0bIpeM.jpg",
        prompt: "Young Asian woman, Modern, contemporary, clean lines, current style"
    },
    {
        styleName: "Monochrome photo",
        imageSrc: "images/k7WBI5Cghbig_arOMA1K-2eSGrgjO7IlKeMeKIdgyA0.jpg",
        prompt: "Young Asian woman, Monochrome photo, single color tone, varying shades"
    },
    {
        styleName: "Moody photo",
        imageSrc: "images/LPbEzSoOfqJGL-oHuv39A3viT3d8faAjFBkkFyy2Nas.jpg",
        prompt: "Young Asian woman, Moody photo, dark tones, atmospheric, emotional"
    },
    {
        styleName: "Motion blur",
        imageSrc: "images/iaKX8lhvMyAnTH_4RSzPK2L7MahVmTUOcp-3ZytxP0E.jpg",
        prompt: "Young Asian woman, Motion blur, sense of movement, blurred elements, dynamic"
    },
    {
        styleName: "Multiple exposure",
        imageSrc: "images/fz781C9tYbqDJAV4rxSCo0MW1fABXhl_Od1dmwvMIoQ.jpg",
        prompt: "Young Asian woman, Multiple exposure, several overlapping shots, experimental"
    },
    {
        styleName: "Mythological",
        imageSrc: "images/nBjcXwnGykUxwftglBpbgNQQ46WhFa8x2ISkbu__pLw.jpg",
        prompt: "Young Asian woman, Mythological, ancient legends, mythical creatures"
    },
    {
        styleName: "Neon glow",
        imageSrc: "images/IM-KcWaA0nDk5-PgxnMYEkTrisErPWvewtfcxBCIWo0.jpg",
        prompt: "Young Asian woman, Neon glow, luminous, bright colors"
    },
    {
        styleName: "Noir",
        imageSrc: "images/944qERkWEE4J2yoxHBHVBdpboRYhrnD7pe8w8-61T-Y.jpg",
        prompt: "Young Asian woman, Noir, dark, moody, detective aesthetic"
    },
    {
        styleName: "Oil Painting",
        imageSrc: "images/z0A8c4JtnmDeqA3invBh7JW3ZUX9eYduaB0ATwWCaxg.jpg",
        prompt: "Young Asian woman, Oil Painting, Converts an image to resemble an oil painting with visible brushstrokes"
    },
    {
        styleName: "Op art",
        imageSrc: "images/NSk6zu4Yufy9Dt5fKUULXlb9oNn7_xA6XvgHvfFdkTc.jpg",
        prompt: "Young Asian woman, Op art, optical illusions, visual effects, movement"
    },
    {
        styleName: "Overexposed",
        imageSrc: "images/xwi0akcw_DqfzNXw2zmBiEf4ptyBiA2Mse6qFlkQhyo.jpg",
        prompt: "Young Asian woman, Overexposed, bright light, washed out, high exposure"
    },
    {
        styleName: "Panoramic photo",
        imageSrc: "images/SzImqD8BIY-HFawEnyatGI7OnCXLWphEeLa92B8wFZk.jpg",
        prompt: "Young Asian woman, Panoramic photo, wide view, landscape sweep, stitched image"
    },
    {
        styleName: "Pastel colors",
        imageSrc: "images/EXcOmmSvUGJaAob9pgA1cEOLTbjG9ELrSsl1ReWV-cs.jpg",
        prompt: "Young Asian woman, Pastel colors, soft tones, gentle hues, calming effect"
    },
    {
        styleName: "Photo collage",
        imageSrc: "images/boHWJwYkLZ1WaDFamxSyQMTaF8l05xClOucu-I2t7IA.jpg",
        prompt: "Young Asian woman, Photo collage, multiple images, creative layout, mixed media"
    },
    {
        styleName: "Photogrammetry",
        imageSrc: "images/iXObCPMWeoU0_4YfncKnUWNoZ7kMhUSG7Iy4sKbG_AI.jpg",
        prompt: "Young Asian woman, Photogrammetry, 3D scan, high detail"
    },
    {
        styleName: "Pixelated",
        imageSrc: "images/8VKucdA77NwSvr4wcTsElj7d8FPxZQhOMnWJBm9gULg.jpg",
        prompt: "Young Asian woman, Pixelated, digital pixel effect, low resolution"
    },
    {
        styleName: "Pointillism",
        imageSrc: "images/nWX7etGquPoLhxfBcDZvlnwoTCKYaqemoTB64Ws1a0E.jpg",
        prompt: "Young Asian woman, Pointillism, dots, impressionist technique"
    },
    {
        styleName: "Polaroid style",
        imageSrc: "images/ghIBE4gAsBVFf_Q1eSxdEYkTUATUHVuTKjIl-PcD2Kw.jpg",
        prompt: "Young Asian woman, Polaroid style, instant photo, white border, retro look"
    },
    {
        styleName: "Pop art",
        imageSrc: "images/01R2mJzHiw9anwoEDhElPsYq2vYShh5KpHZRgym_oIA.jpg",
        prompt: "Young Asian woman, Pop art, bright colors, bold outlines, cultural references"
    },
    {
        styleName: "Portrait photo",
        imageSrc: "images/4Dih04N2GyQniMhx4RowytPa4mnt-782xhAUQYr6roE.jpg",
        prompt: "Young Asian woman, Portrait photo, headshot, expressive face, person-focused"
    },
    {
        styleName: "Post-apocalyptic",
        imageSrc: "images/xEUX96XV14laZuXt9S-N4j6m1Y6T4WUA9w5TTK449NM.jpg",
        prompt: "Young Asian woman, Post-apocalyptic, dystopian, ruined world, survival"
    },
    {
        styleName: "Prismatic",
        imageSrc: "images/oeiNZfuD9Pn0wb3nSUH-2zQMEGAXB8RMgfU55-fXDB4.jpg",
        prompt: "Young Asian woman, Prismatic, light refraction, rainbow effect, colorful"
    },

];


    // Create the images mapping and prompts mapping
    data.forEach(item => {
        images[item.styleName] = item.imageSrc; // Map style names to image sources
        prompts[item.styleName] = item.prompt; // Map style names to prompts
    });

    // Create the table and its header
    const table = document.createElement('table');
    table.className = 'custom-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th class="table-header">Style Name</th>
        <th class="table-header">Image</th>
        <th class="table-header">Prompt</th>
    `;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the table body
    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="table-cell">${item.styleName}</td>
            <td class="table-cell">
                <img alt="${item.styleName} image" height="100" src="${item.imageSrc}" width="100"/>
            </td>
            <td class="table-cell">${item.prompt}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // Append the table to the container
    const container = document.querySelector('.container2');
    container.appendChild(table);
}

// Call the function to create selects when the page loads
window.onload = function () {
    createSelects();
    createTable();
};