
import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaBoxes, FaCheckSquare, FaCalendar } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { TiPencil } from "react-icons/ti";
import { IoIosWarning } from "react-icons/io";
import axios from "axios";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyMoves = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openItem, setOpenItem] = useState(null);
  const [customerData, setCustomerData] = useState([]);

  const fetchApi = async () => {
    try {
      let { data } = await axios.get('http://test.api.boxigo.in/sample-data/');
      setCustomerData(data.Customer_Estimate_Flow);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const toggleItemAccordion = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <>
      <main className="mainContainer">
        <legend>My Moves</legend>
        {customerData.map((item, index) => (
          <section key={index} className='container'>
            <section className="movesContainer">
              <div>From <br /> <p>{item.moving_from}</p></div>
              <div className="arrow"><FaArrowRight /></div>
              <div>To <br /> <p>{item.moving_to}</p></div>
              <div className="requestDiv">Request <br /> <p>{item.estimate_id}</p></div>
            </section>

            <section>
              <ul className="movesDetails">
                <li><MdHome /> {item.property_size}</li>
                <li><FaBoxes /> {item.total_items}</li>
                <li><GiPathDistance /> {item.distance}</li>
                <li><FaCalendar /> {item.moving_on} <span className="pencil"><TiPencil /></span></li>
                <li className="flexible"><FaCheckSquare /> is flexible</li>
                <li>
                  <button className="btnView" onClick={() => toggleAccordion(index)}>
                    View more details
                    <span className={`accordion-arrow ${openAccordion === index ? 'open' : ''}`}>
                    </span>
                  </button>
                  <button className="btnQuote">Quotes Awaiting</button>
                </li>
              </ul>
              <p className="disclaimer"><IoIosWarning /><span>Disclaimer:</span> Please update your move date before two days of shifting</p>
            </section>
            {openAccordion === index && (
              <div className="accordion-content">
                <div className='inventoryTitle'>
                  <h5>Inventory Details
                  <Badge bg="dark">Edit Inventory</Badge>
                  </h5>
                </div>
               
                {item.items.inventory.map((value, idx) => (
                  <React.Fragment key={idx}>
                    <button className="accordion" onClick={() => toggleItemAccordion(idx)}>
                      <div className='inventory_title'>
                        <h5 className='inventory_title_name'>{value.displayName}
                        <span className={`accordion-arrow ${openItem === idx ? 'open' : ''}`}>
                          {openItem === idx ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}
                        </span></h5>
                      </div>
                    </button>
                    {openItem === idx && (
                      <div className="panel accordion-content">
                        {value.category.map((catitem, catIdx) => (
                          <div key={catIdx}>
                            {catitem.items.map((catitemlist, catitemIdx) => (
                              <div key={catitemIdx}>
                                <table className='listTable'>
                                  <tbody>
                                    <tr>
                                      <td>{catitemlist.displayName}</td>
                                      <td>{catitemlist.order}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            ))}
                           
                          </div>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}

                <div className='HouseDetails'>
                  <h5>House Details 
                  <Badge bg="dark">Edit House Details</Badge>
                  </h5>
                </div>
                <div className="old_house">
                  <h4>Existing House Details</h4>
                  <section className="houseContainer">
                    <div>Floor No. <br /> <p>{item.old_floor_no}</p></div>
                    <div>Elevator Available <br /> <p>{item.old_elevator_availability}</p></div>
                    <div>Packing Required <br /> <p>{item.packing_service}</p></div>
                    <div>Distance from truck to door <br /> <p>{item.old_parking_distance}</p></div>
                  </section>
                  <div className='Additional_info'>
                    <h5>Additional Infromation</h5>
                    <p>{item.old_house_additional_info === "" ? "No Additional Info" : item.old_house_additional_info}</p>
                  </div>
                  
                </div>
                <hr />
                <div className="new_house">
                  <h4>New House Details</h4>
                  <section className="houseContainer">
                    <div>Floor No. <br /> <p>{item.new_floor_no}</p></div>
                    <div>Elevator Available <br /> <p>{item.new_elevator_availability}</p></div>
                    <div>Packing Required <br /> <p>{item.packing_service}</p></div>
                    <div>Distance from truck to door <br /> <p>{item.new_parking_distance}</p></div>
                  </section>
                  <div className='Additional_info'>
                    <h5>Additional Infromation</h5>
                    <p>{item.new_house_additional_info === "" ? "No Additional Info" : item.new_house_additional_info}</p>
                  </div>
                </div>
              </div>
            )}
            <hr style={{ border:"1px solid"}}/>
          </section>
        ))}
      </main>
    </>
  );
};

export default MyMoves;





