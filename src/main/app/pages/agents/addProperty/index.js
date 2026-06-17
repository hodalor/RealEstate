import { useContext } from "react";
import Loader from "../../../../components/loader";
import Notify from "../../../../components/notification";
import { AgentsContext } from "../../../../libs/contexts/agentsContext";
import { AuthContext } from "../../../../libs/contexts/authContext";
import {
  getCityOptions,
  getCurrencyOptions,
  getProvinceOptions,
  getSuburbOptions,
} from "../../../../libs/data/siteSettings";

export default function AddProp() {
  const { _handleChange, agentState, _createProperty } =
    useContext(AgentsContext);
  const { loading } = useContext(AuthContext);
  const areaUnits = ["Meters", "CM", "SQM", "SQFEET"];
  const selectedCountry = agentState.property.country || agentState.agent.country || "";
  const selectedProvince = agentState.property.province;
  const selectedCity = agentState.property.city;
  const provinceOptions = getProvinceOptions(agentState.settings, selectedCountry);
  const cityOptions = getCityOptions(agentState.settings, selectedCountry, selectedProvince);
  const suburbOptions = getSuburbOptions(
    agentState.settings,
    selectedCountry,
    selectedProvince,
    selectedCity
  );
  const currencyOptions = getCurrencyOptions(agentState.settings, selectedCountry);
  const isShortStay =
    String(agentState.property.rentOrSale || "").trim().toLowerCase() === "short stay";

  return (
    <div className="container-fluid internal-form-page">
    <div className="row clearfix">
      <div className="col-lg-12">
        <div className="card internal-form-shell">
          <div className="header internal-form-header">
            <h2>
              <strong>Create</strong> Property
              <small>Capture the listing details, amenities, and images for review.</small>
            </h2>
          </div>
          <Notify />
          <div className="body internal-form-body">
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
                    value={agentState.property.propType || ""}
                    onChange={(e) =>
                      _handleChange({
                        field: "propType",
                        value: e.target.value,
                      })
                    }
                  >
                    <option className="form-control" value="">
                      Select property type
                    </option>
                    {(agentState.settings?.property?.propertyTypes || []).map((type) => (
                      <option className="form-control" value={type} key={type}>
                        {type}
                      </option>
                    ))}
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
            <h6 className="internal-section-label">Location Information</h6>
            <div className="row clearfix">
              <div className="col-sm-3">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={selectedCountry}
                    disabled
                    placeholder="Country"
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <select
                    className="form-control"
                    value={agentState.property.province || ""}
                    onChange={(e) =>
                      _handleChange({
                        field: "province",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Province/State</option>
                    {provinceOptions.map((province) => (
                      <option key={province.id} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <select
                    className="form-control"
                    value={agentState.property.city || ""}
                    disabled={!selectedProvince}
                    onChange={(e) =>
                      _handleChange({
                        field: "city",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="">Select City</option>
                    {cityOptions.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <input
                    list="agent-suburb-options"
                    className="form-control"
                    value={agentState.property.suburb || ""}
                    disabled={!selectedCity}
                    placeholder="Select or type suburb"
                    onChange={(e) =>
                      _handleChange({
                        field: "suburb",
                        value: e.target.value,
                      })
                    }
                  />
                  <datalist id="agent-suburb-options">
                    {suburbOptions.map((suburb) => (
                      <option key={suburb} value={suburb} />
                    ))}
                  </datalist>
                </div>
              </div>
            </div>
            <h6 className="internal-section-label">Property Information</h6>
            <div className="row clearfix">
              <div className="col-sm-3">
                <div className="form-group">
                  <select
                    className="form-control"
                    value={agentState.property.rentOrSale || ""}
                    onChange={(e) =>
                      _handleChange({
                        field: "rentOrSale",
                        value: e.target.value,
                      })
                    }
                  >
                    <option className="form-control" value="">
                      Listing Mode
                    </option>
                    <option className="form-control" value="Rent">
                      Rent
                    </option>
                    <option className="form-control" value="Sale">
                      Sale
                    </option>
                    <option className="form-control" value="Short Stay">
                      Short Stay
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <select
                    className="form-control"
                    value={agentState.property.currency || ""}
                    onChange={(e) =>
                      _handleChange({
                        field: "currency",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Currency</option>
                    {currencyOptions.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder={`${
                      isShortStay ? "Nightly Price" : "Price"
                    } (${agentState.property.currency || "Currency"})`}
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
              {isShortStay ? (
                <>
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        placeholder="Minimum nights"
                        value={agentState.property.shortStayMinimumNights || 1}
                        onChange={(e) =>
                          _handleChange({
                            field: "shortStayMinimumNights",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="time"
                        className="form-control"
                        value={agentState.property.shortStayCheckInTime || "14:00"}
                        onChange={(e) =>
                          _handleChange({
                            field: "shortStayCheckInTime",
                            value: e.target.value,
                          })
                        }
                      />
                      <small style={{ fontSize: "12px", marginLeft: "10px" }}>
                        Check-in time
                      </small>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="time"
                        className="form-control"
                        value={agentState.property.shortStayCheckOutTime || "11:00"}
                        onChange={(e) =>
                          _handleChange({
                            field: "shortStayCheckOutTime",
                            value: e.target.value,
                          })
                        }
                      />
                      <small style={{ fontSize: "12px", marginLeft: "10px" }}>
                        Check-out time
                      </small>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="date"
                        className="form-control"
                        value={agentState.property.shortStayAvailabilityStart || ""}
                        onChange={(e) =>
                          _handleChange({
                            field: "shortStayAvailabilityStart",
                            value: e.target.value,
                          })
                        }
                      />
                      <small style={{ fontSize: "12px", marginLeft: "10px" }}>
                        Availability start
                      </small>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="date"
                        className="form-control"
                        value={agentState.property.shortStayAvailabilityEnd || ""}
                        onChange={(e) =>
                          _handleChange({
                            field: "shortStayAvailabilityEnd",
                            value: e.target.value,
                          })
                        }
                      />
                      <small style={{ fontSize: "12px", marginLeft: "10px" }}>
                        Availability end
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <textarea
                        rows={3}
                        className="form-control no-resize"
                        placeholder="Closed dates, one per line or separated with commas"
                        value={agentState.property.shortStayBlockedDates || ""}
                        onChange={(e) =>
                          _handleChange({
                            field: "shortStayBlockedDates",
                            value: e.target.value,
                          })
                        }
                      />
                      <small style={{ fontSize: "12px", marginLeft: "10px" }}>
                        Add any dates the host wants closed inside the available range.
                      </small>
                    </div>
                  </div>
                </>
              ) : null}
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
              <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Property size e.g. 100 x 40"
                    value={agentState.property.areaValue || ""}
                    onChange={(e) =>
                      _handleChange({
                        field: "areaValue",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="form-group">
                  <select
                    className="form-control"
                    value={agentState.property.areaUnit || "SQM"}
                    onChange={(e) =>
                      _handleChange({
                        field: "areaUnit",
                        value: e.target.value,
                      })
                    }
                  >
                    {areaUnits.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
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
              <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Year built (optional)"
                    value={agentState.property.year || ""}
                    onChange={(e) =>
                      _handleChange({
                        field: "year",
                        value: e.target.value,
                      })
                    }
                  />
                  <small style={{ fontSize: "12px", marginLeft: "10px" }}>
                    Optional
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
            <h6 className="internal-section-label">Other Rooms</h6>
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
            <h6 className="internal-section-label">General Amenities</h6>
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
                <form className="form-group m-b-15 m-t-15 row internal-upload-block">
                  <div className="col-sm-12">
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        _handleChange({
                          field: "propImages",
                          value: Array.from(e.target.files || []),
                        })
                      }
                    />
                    <small style={{ fontSize: "12px", marginLeft: "10px" }}>
                      Upload one or more images. At least one image is required.
                    </small>
                    {agentState.property.propImages?.length ? (
                      <div className="mt-2 text-muted">
                        {agentState.property.propImages.length} image(s) selected
                      </div>
                    ) : null}
                  </div>
                </form>
              </div>
              <div className="col-sm-12">
                {loading ? (
                  <Loader />
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary btn-round internal-primary-btn"
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
