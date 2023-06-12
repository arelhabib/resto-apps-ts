import Animated from "../helpers/Animated"

const Home = () => {
  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <Animated>
              <h1>Delicious Food Delivered To Your Door</h1>
              <p className="lead">Order from our extensive menu of delicious dishes and have them delivered to your doorstep in no time. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla aliquid nemo dolor eum? Corporis, voluptate? Sapiente deleniti illum porro et neque non quos magnam?</p>
              <a href="#" className="btn btn-primary btn-lg">Order Now</a>
              <div className="col">
                <div className="card m-5 shadow p-3 mb-5 bg-body-white rounded-5 border border-0" style={{ width: "12rem" }}>
                  <img src="https://th.bing.com/th/id/R.101211092abcd29b15544895c4ed8d21?rik=GnUIzwl5p%2f4XFQ&riu=http%3a%2f%2fwww.ochaya.co.th%2framenboy%2fwp-content%2fuploads%2f2016%2f06%2fmiso-ramen.png&ehk=gGOlS3N5AgqOFaWQ7RJVmTabU6SCRq%2b7rmxJm5IgAgY%3d&risl=&pid=ImgRaw&r=0" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <p className="card-text">Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              </div>
            </Animated>
          </div>
          <div className="col-md-6">
            <Animated>
              <img src="img/img1.png" alt="Delicious Food" className="img-fluid" />
            </Animated>
          </div>
        </div>
      </div>

      <footer className="bg-light py-3 fixed-bottom">
        <div className="container">
          <Animated transition="up">
            <p className="text-center">&copy; 2023 RestoKita - CodeAcademy - TEAM4.</p>
          </Animated>
        </div>
      </footer>

    </div>
  )
}

export default Home