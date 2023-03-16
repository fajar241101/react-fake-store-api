import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Products = () => {
    const url = 'https://fakestoreapi.com/products';
    const [products, setProducts] = useState([]);
    const [showMoreId, setShowMoreId] = useState(false)

    const getDataProducts = async () => {
        const response = await fetch(url);
        const dataProduct = await response.json();
        setProducts(dataProduct);
    }

    useEffect( ()=> {
        getDataProducts();
    })

    return(
        <div className="container-fluid" style={{background: 'linear-gradient(white, aqua, green, blue, orange)'}}>
      <div className="row">
        <h1> Electrogineers Products </h1> {/* looping array */}{" "}
        {products.map((product) => (
          <div className="col-md-6 col-sm-6 col-lg-4 mt-5" key={product.id}>
            <CardProduct
              // membuat props
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              image={product.image}
              showMoreId={showMoreId}
              setShowMoreId={setShowMoreId}
            />{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
    )
}

function CardProduct(props) {
  return (
    <Card
    style={{
        height: '570px',
        overflow: 'auto'
    }}
    >
      <Card.Img 
      variant="top" 
      src={props.image} 
      style={{ 
        width: '200px', 
        height: '300px',
        margin: '20px auto'
        }} 
        />{" "}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>{" "}
        <Card.Text>
                  {" "}
                  {props.showMoreId === props.id
                    ? props.description
                    : props.description.substr(0, 50)}
                  <Card.Link
                    href="#"
                    onClick={(e) => {
                      // e.preventDefault() digunakan untuk mencegah link mereloard halaman
                      e.preventDefault()
                      props.setShowMoreId(
                        props.showMoreId === props.id ? false : props.id
                      )
                    }}
                  >
                    {props.showMoreId === props.id ? "Read Less" : "Read More..."}{" "}
                  </Card.Link>
                </Card.Text>{" "}
                <p> ${props.price} </p> <Button variant="primary"> Add Product </Button>{" "}
              </Card.Body>{" "}
            </Card>
  );
                }
        {/* <Card.Text>
        {props.description}
        <p>Price : {props.price} $</p>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </Card>
        );
      } */}

export default Products;