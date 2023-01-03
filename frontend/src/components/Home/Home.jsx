import "./Home.scss";
import CategoriesSlider from "./categoriesSlider";

const Home = () => {
  return (
    <section className="mainHome">
      <div className="quiz-container">
        <div>
          <h3>
            Faites notre quizz et trouvez votre routine beauté personnalisée.
          </h3>
          <button type="button" className="btn btn-dark">
            Faire le quizz
          </button>
        </div>
        <img
          src="/assets/pexels-andrea-piacquadio-774866.jpg"
          className="quizz-image"
          alt="PICTURE"
        />
      </div>
      <div className="CategorySliderContainer">
        <CategoriesSlider></CategoriesSlider>
      </div>
    </section>
  );
};

export default Home;
