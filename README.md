# Exhibition Curator Project
The Exhibition Curator project is a web application that allows users to explore artworks from the Harvard Art Museums and the MET Museum. Users can search, filter, and curate a personalized exhibition of selected artworks, which can be viewed as a slideshow.

# Built with 
- `Next.js`
- `React`
- `Tailwind CSS`

# Features
- `View Artworks:` Access and browse artworks from the Harvard and MET museums.
- `Search and Filter:` Use dropdown menus and a search bar to filter artworks based on various criteria.
- `Curate Exhibitions:` Add selected artworks to a personalized exhibition page, which can be viewed as a slideshow.
- `External Links:` Click on links to view detailed information about the artworks on external pages.
- `Temporary Storage:` Artworks added to the exhibition are automatically deleted after 30 minutes.

# Prerequisites
- Node.js (version 14 or later)
- npm (version 5.6 or later)

# Installation
- `Clone the repository:`
Fork the repository
git clone <repository-url>
cd exhibition-curator-project

- `Install dependencies:`
Copy code
npm install

- `Create a `.env.local` file in the root of the project and add your API key:`
You will need to request an API key from [Harvard Art Museums API](https://harvardartmuseums.org/collections/api).

NEXT_PUBLIC_HARVARD_API_KEY=`your-harvard-api-key`

- `Start the development server:`
bash
Copy code
npm run dev

- `Open your browser and navigate to http://localhost:3000.`

# Usage
- View artowork collections from Harvard and Met Museum
- Use searchbar and dropwdown menus to filter through artworks
- Select artworks and add them to personal collection
- View all selected artworks in Exhibition page

# Extra features
- Toggle dark mode in Exhibition page
- Delete artworks from Exhibition page
- Adjusted for mobile responsiveness

