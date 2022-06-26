import { useContext } from "react";
import Loader from "../../../../components/loader";
import Notify from "../../../../components/notification";
import ImageUpload from "../../../../components/uploadImage";
import { AgentsContext } from "../../../../libs/contexts/agentsContext";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function AddProp() {
  const { _handleChange, agentState, _createProperty } =
    useContext(AgentsContext);
  const { loading } = useContext(AuthContext);

  return (
    <div className="container-fluid">
    <div className="row clearfix">
      <div className="col-lg-12">
        <div className="card">
          <div className="header">
            <h2>
              <strong>Basic</strong> Information{" "}
              <small>Property Description...</small>{" "}
            </h2>
          </div>
          <Notify />
          <div className="body">
            <div className="row clearfix">
              <div className="col-sm-3">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={agentState.property.propName}
                    placeholder="Property Name"
                    onChange={(e) =>
                      _handleChange({
                        field: "propName",
                        value: e.target.value.toUpperCase(),
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={agentState.property.propLoca}
                    placeholder="Property Location"
                    onChange={(e) =>
                      _handleChange({
                        field: "propLoca",
                        value: e.target.value.toUpperCase(),
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    value={agentState.property.rooms}
                    placeholder="Number Of Rooms"
                    onChange={(e) =>
                      _handleChange({
                        field: "rooms",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      _handleChange({
                        field: "propType",
                        value: e.target.value.toUpperCase(),
                      })
                    }
                  >
                    <option className="form-control" value="">
                      Select property type
                    </option>
                    <option className="form-control" value="Single room">
                      Single room
                    </option>
                    <option className="form-control" value="Apartment">
                      Apartment
                    </option>
                    <option className="form-control" value="Full house">
                      Full house
                    </option>
                    <option className="form-control" value="Office">
                      Office
                    </option>
                    <option className="form-control" value="Shop">
                      Shop
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <div className="form-line">
                    <textarea
                      rows={4}
                      className="form-control no-resize"
                      value={agentState.property.propDesc}
                      placeholder="Property Description"
                      onChange={(e) =>
                        _handleChange({
                          field: "propDesc",
                          value: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <h6 className="mt-4">Property Information</h6>
            <div className="row clearfix">
              <div className="col-sm-3">
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      _handleChange({
                        field: "rentOrSale",
                        value: e.target.value.toUpperCase(),
                      })
                    }
                  >
                    <option className="form-control" value="">
                      Rent / Sale
                    </option>
                    <option className="form-control" value="rent">
                      Rent
                    </option>
                    <option className="form-control" value="sale">
                      Sale
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price / Rent (GH)"
                    value={agentState.property.price}
                    onChange={(e) =>
                      _handleChange({
                        field: "price",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Number bedrooms"
                    value={agentState.property.bedRoomNumber}
                    onChange={(e) =>
                      _handleChange({
                        field: "bedRooms",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Number bathrooms"
                    value={agentState.property.bathRoomNumber}
                    onChange={(e) =>
                      _handleChange({
                        field: "bathRooms",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Square ft"
                    value={agentState.property.sqft}
                    onChange={(e) =>
                      _handleChange({
                        field: "sqft",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      _handleChange({
                        field: "carPark",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="">Car Park</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Year Built"
                    // value={agentState.property.year}
                    onChange={(e) =>
                      _handleChange({
                        field: "year",
                        value: new Date(e.target.value)
                          .getFullYear()
                          .toString(),
                      })
                    }
                  />
                  <small style={{ fontSize: "12px", marginLeft: "10px" }}>
                    Year built
                  </small>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <textarea
                    rows={4}
                    className="form-control no-resize"
                    placeholder="Property digital address"
                    value={agentState.property.address}
                    onChange={(e) =>
                      _handleChange({
                        field: "paddress",
                        value: e.target.value.toUpperCase(),
                      })
                    }
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <h6 className="mt-4">Other rooms(yes/no)</h6>
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="form-line">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      _handleChange({
                        field: "dRoom",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="">Dinning Room</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="form-line">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      _handleChange({
                        field: "kitchen",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="">Kitchen</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="form-line">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      _handleChange({
                        field: "livRoom",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="">Living Room</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      _handleChange({
                        field: "mBedroom",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="">Master Bed Room</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      _handleChange({
                        field: "porch",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="">Porch</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      _handleChange({
                        field: "stRoom",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="">Store Room</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
            </div>
            <h6 className="mt-4">General Amenities</h6>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group inlineblock">
                  <input
                    style={{ width: "20px", height: "20px", margin: "10px" }}
                    type="checkbox"
                    value={agentState.property.pool}
                    onChange={(e) =>
                      _handleChange({
                        field: "pool",
                        value: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="checkbox21">Swimming Pool</label>
                </div>
                <div className="form-group inlineblock">
                  <input
                    style={{ width: "20px", height: "20px", margin: "10px" }}
                    type="checkbox"
                    value={agentState.property.ppWater}
                    onChange={(e) =>
                      _handleChange({
                        field: "ppWater",
                        value: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="checkbox22">Pipe Water</label>
                </div>
                <div className="form-group inlineblock">
                  <input
                    style={{ width: "20px", height: "20px", margin: "10px" }}
                    type="checkbox"
                    value={agentState.property.acon}
                    onChange={(e) =>
                      _handleChange({
                        field: "acon",
                        value: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="checkbox23">Air Conditioning</label>
                </div>
                <div className="form-group inlineblock">
                  <input
                    style={{ width: "20px", height: "20px", margin: "10px" }}
                    type="checkbox"
                    value={agentState.property.elct}
                    onChange={(e) =>
                      _handleChange({
                        field: "elct",
                        value: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="checkbox24">Electricity</label>
                </div>
                <div className="form-group inlineblock">
                  <input
                    style={{ width: "20px", height: "20px", margin: "10px" }}
                    type="checkbox"
                    value={agentState.property.nmRoad}
                    onChange={(e) =>
                      _handleChange({
                        field: "nmRoad",
                        value: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="checkbox29">Near Main Road</label>
                </div>
                <div className="form-group inlineblock">
                  <input
                    style={{ width: "20px", height: "20px", margin: "10px" }}
                    type="checkbox"
                    value={agentState.property.nsMarket}
                    onChange={(e) =>
                      _handleChange({
                        field: "nsMarket",
                        value: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="checkbox31">Near Supermarket</label>
                </div>
                <div className="form-group inlineblock">
                  <input
                    style={{ width: "20px", height: "20px", margin: "10px" }}
                    type="checkbox"
                    value={agentState.property.pets}
                    onChange={(e) =>
                      _handleChange({
                        field: "pets",
                        value: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="checkbox31">Pets Allowed?</label>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-12">
                <form className="form-group m-b-15 m-t-15 row">
                  <ImageUpload
                    onUpload={(v) =>
                      _handleChange({
                        field: "image_1",
                        value: v,
                      })
                    }
                  />
                  <ImageUpload
                    onUpload={(v) =>
                      _handleChange({
                        field: "image_2",
                        value: v,
                      })
                    }
                  />
                  <ImageUpload
                    onUpload={(v) =>
                      _handleChange({
                        field: "image_3",
                        value: v,
                      })
                    }
                  />
                  <ImageUpload
                    onUpload={(v) =>
                      _handleChange({
                        field: "image_4",
                        value: v,
                      })
                    }
                  />
                  <ImageUpload
                    onUpload={(v) =>
                      _handleChange({
                        field: "image_5",
                        value: v,
                      })
                    }
                  />
                </form>
              </div>
              <div className="col-sm-12">
                {loading ? (
                  <Loader />
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary btn-round"
                    onClick={_createProperty}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
