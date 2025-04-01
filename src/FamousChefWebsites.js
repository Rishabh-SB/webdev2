import React from 'react';

const FamousChefWebsites = () => {
  const websites = [
    {
      name: 'Foodnetwork.com',
      description: 'The Food Network website features recipes, cooking shows, and tips from renowned chefs like Bobby Flay, Giada De Laurentiis, and Ree Drummond.',
      url: 'https://www.foodnetwork.com/',
    },
    {
      name: 'GordonRamsay.com',
      description: 'Gordon Ramsay\'s official website offers recipes, cooking videos, and information about his restaurants and TV shows.',
      url: 'https://www.gordonramsay.com/',
    },
    {
      name: 'JamieOliver.com',
      description: 'Jamie Oliver\'s website provides a wide range of recipes, cooking tips, and resources for healthy and delicious meals.',
      url: 'https://www.jamieoliver.com/',
    },
    {
      name: 'MarthaStewart.com',
      description: 'Martha Stewart\'s website is a hub for recipes, crafts, home decor ideas, and lifestyle tips from the renowned lifestyle guru.',
      url: 'https://www.marthastewart.com/',
    },
    {
      name: 'SeriousEats.com',
      description: 'Serious Eats is a popular food blog featuring recipes, cooking techniques, and in-depth culinary explorations from a team of dedicated writers and chefs.',
      url: 'https://www.seriouseats.com/',
    },
  ];

  return (
    <div className="famous-chef-websites">
      <h1>Famous Chef Websites</h1>
      <p>Explore these renowned chef websites for inspiration and culinary knowledge:</p>
      <ul>
        {websites.map((website, index) => (
          <li key={index}>
            <h2>{website.name}</h2>
            <p>{website.description}</p>
            <a href={website.url} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FamousChefWebsites;