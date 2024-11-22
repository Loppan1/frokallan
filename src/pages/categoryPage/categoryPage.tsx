import { useParams } from 'react-router-dom';
import categories from '../../assets/categories.json';
import products from '../../assets/products.json';
import './categoryPage.css';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import ProductCard from '../../components/ProductCard/ProductCard';

const CategoryPage = () => {
  const { category } = useParams();
  const categoryData = categories.find(cat => cat.title.toLowerCase() === category);
  const categoryDesc = categoryData ? categoryData.description : "";
  const productData = products.filter(prd => prd.category.toLowerCase() === category);

  if (categoryData) {
    if (productData?.length === 0) {
      return (
        <div className="category-page">
          <h1 className='category-page__title'>{categoryData.title}</h1>
            {categoryData.children?.map((childCat, index) => {
              const childData = categories.find(cat => cat.title === childCat);
            
            return (
              <CategoryCard 
                key={index}
                name = {childData?.title}
                image = {childData?.image}
                />
            );
            })}
        </div>
      );
    }
    return (
        <div className="category-page">
        <h1 className='category-page__title'>{category}</h1>
        <p className='category-page__description'>{categoryDesc}</p>
            {productData.map((prd, index) => (
          <ProductCard 
            key={index}
            image={prd.images[0]}
            title={prd.title}
            name={prd.name}
            price={prd.price}
            category={category}
          />
        ))}
      </div>
    );
  }

  
}

export default CategoryPage;