import React, { createContext, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../authContext";
import { toast } from "react-toastify";
import {
  _validateAdmin,
  _validateAgent,
  _validatePass,
  _validateProp,
} from "../../functions/validations";
import { _addAgent, _addProperty, _createAdmin } from "../../functions/creates";
import {
  _fetchAdmin,
  _fetchAgents,
  _fetchAll,
  _fetchProperties,
} from "../../functions/fetches";
import { _calcDays } from "../../functions/dateDiff";
import {
  _approveProperty,
  _blockAgnt,
  _editAgent,
  _editPass,
  _updateProperty,
  _unblockAgnt,
} from "../../functions/edits";
import { _delAgent } from "../../functions/deletes";
import { _retrieveFromStroage, _saveToStorage } from "../../functions/storage";
import { settingsUrl } from "../../data/baseUrls";
import { normalizeSiteSettings } from "../../data/siteSettings";

export const AdminContext = createContext();

const reorderByIndex = (items = [], index = 0) => {
  if (!Array.isArray(items) || items.length <= 1) return Array.isArray(items) ? items : [];
  const safeIndex = Math.max(0, Math.min(index, items.length - 1));
  const nextItems = [...items];
  const [selectedItem] = nextItems.splice(safeIndex, 1);
  return [selectedItem, ...nextItems];
};

const extractPropertyImages = (property = {}) => {
  const images = property.images || {};
  return [
    images.image1,
    images.image2,
    images.image3,
    images.image4,
    images.image5,
    ...(Array.isArray(images.gallery) ? images.gallery : []),
  ].filter(Boolean);
};

const getEmptyUserState = () => ({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  address: "",
  con_pass: "",
  new_pass: "",
  image: {},
  dob: "",
  country: "",
  ghcard: "",
  gr1Name: "",
  gr1Contact: "",
  rel1: "",
  gr2Name: "",
  gr2Contact: "",
  rel2: "",
  gender: "",
  fb: "",
  tw: "",
  ins: "",
  authorizations: [],
  isBlocked: false,
});

const getEmptyPropertyState = () => ({
  propName: "",
  propLoca: "",
  propType: "",
  propDesc: "",
  rentOrSale: "",
  price: Number,
  currency: "",
  bedRoomNumber: Number,
  bathRoomNumber: Number,
  areaValue: "",
  areaUnit: "SQM",
  sqft: "",
  carPark: Boolean,
  year: "",
  agentID: "",
  address: "",
  country: "",
  province: "",
  city: "",
  suburb: "",
  dRoom: Boolean,
  kitchen: Boolean,
  livRoom: Boolean,
  mBedroom: Boolean,
  porch: Boolean,
  stRoom: Boolean,
  pool: Boolean,
  ppWater: Boolean,
  acon: Boolean,
  elct: Boolean,
  nmRoad: Boolean,
  nsMarket: Boolean,
  pets: Boolean,
  rooms: Number,
  propImages: [],
  existingImages: [],
  coverImageIndex: 0,
  editId: "",
  shortStayMinimumNights: 1,
  shortStayCheckInTime: "14:00",
  shortStayCheckOutTime: "11:00",
  shortStayAvailabilityStart: "",
  shortStayAvailabilityEnd: "",
  shortStayBlockedDates: "",
});

export default function AdminContextProvider(props) {
  const history = useHistory();

  const { notiData, setNotiData, setLoading } = useContext(AuthContext);

  const [adminData, setAdminData] = useState({
    user: getEmptyUserState(),
    property: getEmptyPropertyState(),
    settings: normalizeSiteSettings(),
    categories: {
      all: true,
      singleRooms: false,
      appartments: false,
      offices: false,
      shops: false,
      fullHouse: false,
    },
    agents: [],
    properties: [],
    pending: [],
    customers: [],
    admins: [],
    agent: {},
    propertyDetails: {},
    customer: {},
    admin: {},
  });

  const _resetDetails = async (key) => {
    const data = await _retrieveFromStroage(key);

    if (key === "property")
      return setAdminData({
        ...adminData,
        propertyDetails: data,
      });

    if (key === "agent")
      return setAdminData({
        ...adminData,
        agent: data,
      });

    if (key === "customer")
      return setAdminData({
        ...adminData,
        customer: data,
      });
  };

  const _routeToDetails = async (data) => {
    const store = await _saveToStorage({ data, key: "property" });

    if (store) {
      setAdminData({
        ...adminData,
        propertyDetails: data,
      });
      history.push("/admin/properties/details/" + data._id);
    }
  };

  const _routeToAgents = async (data) => {
    const res = await _calcDays(data.createdAt);
    data.days = res;

    const store = await _saveToStorage({ data, key: "agent" });

    if (store) {
      setAdminData({
        ...adminData,
        agent: data,
      });
      history.push("/admin/agents/details/" + data._id);
    }
  };

  const _routeToUsers = async (data) => {
    const store = await _saveToStorage({ data, key: "custo" });

    if (store) {
      setAdminData({
        ...adminData,
        customer: data,
      });
      history.push("/admin/users/user/" + data._id);
    }
  };

  useEffect(() => {
    getAdminData();
    _fetchSettings();
  }, []);

  const getAdminData = async () => {
    const userData = await _retrieveFromStroage("user");
    setAdminData({
      ...adminData,
      admin: userData,
    });

    setLoading(true);
    const [results, adminResults] = await Promise.all([_fetchAll(), _fetchAdmin()]);

    setLoading(false);
    if (results !== undefined) {
      const agentsData = results[0];
      const propData = results[1];
      const custData = results[2];

      var pend = [];
      var ps = [];
      if (propData.success !== 0) {
        propData.data.forEach((pro) => {
          if (pro.isApproved) ps.push(pro);
          if (!pro.isApproved) pend.push(pro);
        });
      }

      if (agentsData.success === 1) {
        setAdminData({
          ...adminData,
          agents: agentsData.data,
          properties: ps,
          pending: pend,
          customers: custData.success === 1 ? custData.data : [],
          admins: adminResults?.success === 1 ? adminResults.data : [],
          admin: userData,
        });
      }
    }
  };

  const _handleChange = (data) => {
    const { field, value } = data;

    if (field === "firstName")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          firstName: value,
        },
      });

    if (field === "authorizations") {
      const currentAuthorizations = adminData.user.authorizations || [];
      const nextAuthorizations = currentAuthorizations.includes(value)
        ? currentAuthorizations.filter((item) => item !== value)
        : [...currentAuthorizations, value];

      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          authorizations: nextAuthorizations,
        },
      });
    }
      
    if (field === "country")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          country: value,
          province: "",
          city: "",
          suburb: "",
        },
      });
      
    if (field === "province")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          province: value,
          city: "",
          suburb: "",
        },
      });
      
    if (field === "city")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          city: value,
          suburb: "",
        },
      });
      
    if (field === "suburb")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          suburb: value,
        },
      });

    if (field === "currency")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          currency: value,
        },
      });

    if (field === "shortStayMinimumNights")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          shortStayMinimumNights: value,
        },
      });

    if (field === "shortStayCheckInTime")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          shortStayCheckInTime: value,
        },
      });

    if (field === "shortStayCheckOutTime")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          shortStayCheckOutTime: value,
        },
      });

    if (field === "shortStayAvailabilityStart")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          shortStayAvailabilityStart: value,
        },
      });

    if (field === "shortStayAvailabilityEnd")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          shortStayAvailabilityEnd: value,
        },
      });

    if (field === "shortStayBlockedDates")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          shortStayBlockedDates: value,
        },
      });

    if (field === "lastName")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          lastName: value,
        },
      });

    if (field === "phone")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          phone: value,
        },
      });

    if (field === "email")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          email: value,
        },
      });

    if (field === "password")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          password: value,
        },
      });

    if (field === "con_pass")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          con_pass: value,
        },
      });

    if (field === "new_pass")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          new_pass: value,
        },
      });

    if (field === "address")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          address: value,
        },
      });

    if (field === "image")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          image: value.file,
        },
      });

    if (field === "dob")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          dob: value,
        },
      });

    if (field === "userCountry")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          country: value,
        },
      });

    if (field === "ghcard")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          ghcard: value,
        },
      });

    if (field === "gr1Name")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          gr1Name: value,
        },
      });

    if (field === "gr1Contact")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          gr1Contact: value,
        },
      });

    if (field === "rel1")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          rel1: value,
        },
      });

    if (field === "gr2Name")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          gr2Name: value,
        },
      });

    if (field === "gr2Contact")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          gr2Contact: value,
        },
      });

    if (field === "rel2")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          rel2: value,
        },
      });

    if (field === "gender")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          gender: value,
        },
      });

    if (field === "fb")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          fb: value,
        },
      });

    if (field === "tw")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          tw: value,
        },
      });

    if (field === "ins")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          ins: value,
        },
      });

    if (field === "propName")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propName: value,
        },
      });

    if (field === "propLoca")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propLoca: value,
        },
      });

    if (field === "propType")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propType: value,
        },
      });

    if (field === "propDesc")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propDesc: value,
        },
      });

    if (field === "rentOrSale")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          rentOrSale: value,
        },
      });

    if (field === "price")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          price: value,
        },
      });

    if (field === "bedRooms")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          bedRoomNumber: value,
        },
      });

    if (field === "bathRooms")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          bathRoomNumber: value,
        },
      });

    if (field === "sqft" || field === "areaValue")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          areaValue: value,
          sqft: value,
        },
      });

    if (field === "areaUnit")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          areaUnit: value,
        },
      });

    if (field === "carPark")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          carPark: value,
        },
      });

    if (field === "year")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          year: value,
        },
      });

    if (field === "agentID")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          agentID: value,
        },
      });

    if (field === "paddress")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          address: value,
        },
      });

    if (field === "dRoom")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          dRoom: value,
        },
      });

    if (field === "kitchen")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          kitchen: value,
        },
      });

    if (field === "livRoom")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          livRoom: value,
        },
      });

    if (field === "mBedroom")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          mBedroom: value,
        },
      });

    if (field === "porch")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          porch: value,
        },
      });

    if (field === "stRoom")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          stRoom: value,
        },
      });

    if (field === "pool")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          pool: value,
        },
      });

    if (field === "ppWater")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          ppWater: value,
        },
      });

    if (field === "acon")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          acon: value,
        },
      });

    if (field === "elct")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          elct: value,
        },
      });

    if (field === "nmRoad")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          nmRoad: value,
        },
      });

    if (field === "nsMarket")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          nsMarket: value,
        },
      });

    if (field === "pets")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          pets: value,
        },
      });

    if (field === "propImages")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propImages: Array.isArray(value) ? value : [],
          coverImageIndex: 0,
        },
      });

    if (field === "coverImageIndex")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          coverImageIndex: Number(value) || 0,
        },
      });

    if (field === "existingImages")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          existingImages: Array.isArray(value) ? value : [],
        },
      });

    if (field === "image_1")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propImages: [...adminData.property.propImages, value.file],
        },
      });

    if (field === "image_2")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propImages: [...adminData.property.propImages, value.file],
        },
      });

    if (field === "image_3")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propImages: [...adminData.property.propImages, value.file],
        },
      });

    if (field === "image_4")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propImages: [...adminData.property.propImages, value.file],
        },
      });

    if (field === "image_5")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propImages: [...adminData.property.propImages, value.file],
        },
      });

    if (field === "rooms")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          rooms: value,
        },
      });
  };

  const _cancelAdd = () => {
    setAdminData({
      ...adminData,
      user: getEmptyUserState(),
    });
  };

  const _cancelProperty = () => {
    setAdminData({
      ...adminData,
      property: getEmptyPropertyState(),
    });
  };

  const buildPropertyFormState = (property = {}) => ({
    ...getEmptyPropertyState(),
    propName: property.name || "",
    propLoca: property.location || "",
    propType: property.propType || "",
    propDesc: property.propDescription || "",
    rentOrSale: property.rentOrSale || "",
    price: property.price ?? "",
    currency: property.currency || "",
    bedRoomNumber: property.others?.noOfBedrooms ?? "",
    bathRoomNumber: property.others?.bathrooms ?? "",
    areaValue: property.areaValue || property.squareFt || "",
    areaUnit: property.areaUnit || "SQM",
    sqft: property.areaValue || property.squareFt || "",
    carPark: property.others?.carPark ?? false,
    year: property.yearBuilt || "",
    agentID: property.agentID || "",
    address: property.digitalAddress || "",
    country: property.country || "",
    province: property.province || "",
    city: property.city || "",
    suburb: property.suburb || "",
    dRoom: property.others?.diningRoom ?? false,
    kitchen: property.others?.kitchen ?? false,
    livRoom: property.others?.livingRoom ?? false,
    mBedroom: property.others?.masterBedroom ?? false,
    porch: property.others?.porch ?? false,
    stRoom: property.others?.storeRoom ?? false,
    pool: property.amenities?.swimmingPool ?? false,
    ppWater: property.amenities?.pipeWater ?? false,
    acon: property.amenities?.airCondition ?? false,
    elct: property.amenities?.electricity ?? false,
    nmRoad: property.amenities?.nearMainRoad ?? false,
    nsMarket: property.amenities?.nearSuperMarket ?? false,
    pets: property.amenities?.petsAllowed ?? false,
    rooms: property.numberOfRooms ?? "",
    propImages: [],
    existingImages: extractPropertyImages(property),
    coverImageIndex: 0,
    editId: property._id || "",
    shortStayMinimumNights: property.shortStay?.minimumNights || 1,
    shortStayCheckInTime: property.shortStay?.checkInTime || "14:00",
    shortStayCheckOutTime: property.shortStay?.checkOutTime || "11:00",
    shortStayAvailabilityStart: property.shortStay?.openDates?.[0] || "",
    shortStayAvailabilityEnd:
      property.shortStay?.openDates?.[property.shortStay?.openDates?.length - 1] || "",
    shortStayBlockedDates: Array.isArray(property.shortStay?.blockedDates)
      ? property.shortStay.blockedDates.join(", ")
      : "",
  });

  const _preparePropertyForEdit = async (_id) => {
    let property =
      adminData.properties.find((item) => item._id === _id) ||
      adminData.pending.find((item) => item._id === _id) ||
      (adminData.propertyDetails?._id === _id ? adminData.propertyDetails : null);

    if (!property) {
      const storedProperty = await _retrieveFromStroage("property");
      if (storedProperty?._id === _id) {
        property = storedProperty;
      }
    }

    if (!property) {
      const results = await _fetchProperties();
      if (results?.success === 1) {
        property = results.data.find((item) => item._id === _id);
      }
    }

    if (!property) {
      toast.error("Property not found");
      history.push("/admin/properties/");
      return null;
    }

    await _saveToStorage({ data: property, key: "property" });

    setAdminData({
      ...adminData,
      property: buildPropertyFormState(property),
      propertyDetails: property,
    });

    return property;
  };

  const _savePropertyEdits = async (_id) => {
    const payload = {
      ...adminData.property,
      propImages: reorderByIndex(
        adminData.property.propImages,
        adminData.property.coverImageIndex || 0
      ),
      existingImages:
        adminData.property.propImages.length > 0
          ? []
          : reorderByIndex(
              adminData.property.existingImages,
              adminData.property.coverImageIndex || 0
            ),
    };

    const validate = await _validateProp({
      ...payload,
      propImages:
        payload.propImages.length > 0 ? payload.propImages : payload.existingImages,
    });

    if (validate.status === false) {
      toast.warning(validate.mesg);
      return false;
    }

    setLoading(true);

    const results = await _updateProperty(_id, payload);

    if (results === undefined || results.success === 0) {
      setLoading(false);
      toast.error(results?.message || "Failed to update property");
      return false;
    }

    const getData = await _fetchProperties();

    if (getData === undefined || getData.success === 0) {
      setLoading(false);
      toast.warning(getData?.message || "Failed to refresh properties");
      return false;
    }

    const pending = [];
    const approved = [];
    getData.data.forEach((pro) => {
      if (pro.isApproved) approved.push(pro);
      if (!pro.isApproved) pending.push(pro);
    });

    const refreshedProperty =
      getData.data.find((property) => property._id === _id) || adminData.propertyDetails;

    setAdminData({
      ...adminData,
      properties: approved,
      pending,
      property: buildPropertyFormState(refreshedProperty),
      propertyDetails: refreshedProperty,
    });

    await _saveToStorage({ data: refreshedProperty, key: "property" });

    setLoading(false);
    toast.success("Property updated successfully!");
    history.push(`/admin/properties/details/${_id}`);
    return true;
  };

  const _submit = async () => {
    const validate = await _validateAdmin(adminData.user);

    if (validate.status === false) {
      toast.warning(validate.mesg);
      return false;
    }

    setLoading(true);

    const results = await _createAdmin(adminData.user);

    _cancelAdd();
    setLoading(false);
    if (results === undefined || results.success === 0) {
      toast.error(results?.message || "Failed to create admin");
      return false;
    }

    const adminsResult = await _fetchAdmin();

    if (adminsResult?.success === 1) {
      setAdminData({
        ...adminData,
        admins: adminsResult.data,
      });
    }

    toast.success(results.message || "Admin created successfully!");
    return true;
  };

  const _createAgent = async () => {
    const validate = await _validateAgent(adminData.user);

    if (validate.status === false) {
      toast.warning(validate.mesg);
      return false;
    }

    setLoading(true);

    const results = await _addAgent(adminData.user);

    _cancelAdd();
    if (results === undefined || results.success === 0) {
      setLoading(false);
      toast.error(results?.message || "Failed to create agent");
      return false;
    }

    const getData = await _fetchAgents();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      toast.warning(getData?.message || "Failed to fetch agents");

      setAdminData({
        ...adminData,
        agents: [],
      });

      return false;
    }

    setAdminData({
      ...adminData,
      agents: getData.data,
    });

    toast.success("Agent created successfully!");
    return true;
  };

  const _changePass = async (key) => {
    const validate = await _validatePass(adminData.user);

    if (!validate.status) {
      toast.warning(validate.mesg);
      return;
    }

    setLoading(true);

    const res = await _editPass({
      data: adminData,
      key,
      admin: adminData.admin,
    });

    _cancelAdd();
    if (res === undefined || res.success === 0) {
      setLoading(false);
      toast.error(res?.message || "Failed to update password");
      return;
    }

    const getData = await _fetchAgents();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      toast.warning(getData?.message || "Failed to fetch agents");

      setAdminData({
        ...adminData,
        agents: [],
      });

      return;
    }

    setAdminData({
      ...adminData,
      agents: getData.data,
    });

    toast.success("Password updated successfully!");
  };

  const _saveChanges = async (key) => {
    setLoading(true);

    const results = await _editAgent({
      fields: adminData.user,
      agent: adminData.agent,
      key,
      admin: adminData.admin,
    });

    _cancelAdd();
    if (results === undefined || results.success === 0) {
      setLoading(false);
      toast.error(results?.message || "Failed to update agent data");
      return;
    }

    const getData = await _fetchAgents();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      toast.warning(getData?.message || "Failed to fetch agents");

      setAdminData({
        ...adminData,
        agents: [],
      });

      return;
    }

    setAdminData({
      ...adminData,
      agents: getData.data,
    });

    toast.success("Agent data updated successfully!");
  };

  const _blockAgent = async () => {
    setLoading(true);
    const results = await _blockAgnt({
      fields: adminData.user,
      agent: adminData.agent,
    });

    _cancelAdd();
    if (results === undefined || results.success === 0) {
      setLoading(false);
      toast.error(results?.message || "Failed to block agent");
      return;
    }

    const getData = await _fetchAgents();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      toast.warning(getData?.message || "Failed to fetch agents");

      setAdminData({
        ...adminData,
        agents: [],
      });

      return;
    }

    setAdminData({
      ...adminData,
      agents: getData.data,
    });

    toast.success("Agent blocked successfully!");
  };

  const _unblockAgent = async () => {
    setLoading(true);
    const results = await _unblockAgnt({
      fields: adminData.user,
      agent: adminData.agent,
    });

    _cancelAdd();
    if (results === undefined || results.success === 0) {
      setLoading(false);
      toast.error(results?.message || "Failed to unblock agent");
      return;
    }

    const getData = await _fetchAgents();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      toast.warning(getData?.message || "Failed to fetch agents");

      setAdminData({
        ...adminData,
        agents: [],
      });

      return;
    }

    setAdminData({
      ...adminData,
      agents: getData.data,
    });

    toast.success("Agent unblocked successfully!");
  };

  const _removeAgent = async () => {
    setLoading(true);
    const results = await _delAgent(adminData.agent._id);

    _cancelAdd();
    if (results === undefined || results.success === 0) {
      setLoading(false);
      toast.error(results?.message || "Failed to delete agent");
      return;
    }

    const getData = await _fetchAgents();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      toast.warning(getData?.message || "Failed to fetch agents");

      setAdminData({
        ...adminData,
        agents: [],
      });

      return;
    }

    setAdminData({
      ...adminData,
      agents: getData.data,
    });

    toast.success("Agent deleted successfully!");

    history.push("/admin/agents/");
  };

  const _createProperty = async () => {
    const propertyPayload = {
      ...adminData.property,
      propImages: reorderByIndex(
        adminData.property.propImages,
        adminData.property.coverImageIndex || 0
      ),
    };

    const validate = await _validateProp(propertyPayload);

    if (validate.status === false) {
      toast.warning(validate.mesg);
      return false;
    }

    setLoading(true);

    const results = await _addProperty(propertyPayload);

    _cancelProperty();
    if (results === undefined || results.success === 0) {
      setLoading(false);
      toast.error(results?.message || "Failed to create property");
      return false;
    }

    const getData = await _fetchProperties();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      toast.warning(getData?.message || "Failed to fetch properties");

      setAdminData({
        ...adminData,
        properties: [],
      });

      return false;
    }

    var pend = [];
    var ps = [];
    getData.data.forEach((pro) => {
      if (pro.isApproved) ps.push(pro);
      if (!pro.isApproved) pend.push(pro);
    });

    setAdminData({
      ...adminData,
      properties: ps,
      pending: pend,
    });

    toast.success("Property added successfully!");
    return true;
  };

  const _findAndRouteToAgent = (_id) => {
    const agent = adminData.agents.find((item) => item._id === _id);

    if (agent) {
      setAdminData({
        ...adminData,
        agent: agent,
      });

      history.push("/admin/agents/details/" + _id);

      return;
    }
  };

  const _handleCategory = (data) => {
    if (data.field === "all") {
      setAdminData({
        ...adminData,
        categories: {
          ...adminData.categories,
          all: data.value ? true : false,
          singleRooms: false,
          appartments: false,
          offices: false,
          shops: false,
          fullHouse: false,
        },
      });
    }
  };

  const _approve = async (data) => {
    setLoading(true);

    const results = await _approveProperty(data._id);

    if (results === undefined || results.success === 0) {
      setLoading(false);
      toast.error(results?.message || "Failed to approve property");
      return;
    }

    const getData = await _fetchProperties();

    if (getData === undefined || getData.success === 0) {
      setLoading(false);
      toast.warning(getData?.message || "Failed to fetch properties");

      setAdminData({
        ...adminData,
        properties: [],
      });

      return;
    }

    var pend = [];
    var ps = [];
    getData.data.forEach((pro) => {
      if (pro.isApproved) ps.push(pro);
      if (!pro.isApproved) pend.push(pro);
    });

    const refreshedProperty =
      getData.data.find((property) => property._id === data._id) || adminData.propertyDetails;

    setAdminData({
      ...adminData,
      properties: ps,
      pending: pend,
      propertyDetails: refreshedProperty,
    });

    setLoading(false);

    toast.success("Property approved successfully!");
  };

  const _updateShortStayAvailability = async (_id, shortStay) => {
    setLoading(true);

    const results = await _updateProperty(_id, {
      rentOrSale: "Short Stay",
      shortStay,
    });

    if (results === undefined || results.success === 0) {
      setLoading(false);
      toast.error(results?.message || "Failed to update short stay availability");
      return false;
    }

    const getData = await _fetchProperties();

    if (getData === undefined || getData.success === 0) {
      setLoading(false);
      toast.warning(getData?.message || "Failed to refresh properties");
      return false;
    }

    const pending = [];
    const approved = [];
    getData.data.forEach((pro) => {
      if (pro.isApproved) approved.push(pro);
      if (!pro.isApproved) pending.push(pro);
    });

    const refreshedProperty = getData.data.find((item) => item._id === _id) || adminData.propertyDetails;

    setAdminData({
      ...adminData,
      properties: approved,
      pending,
      propertyDetails: refreshedProperty,
    });

    setLoading(false);
    toast.success("Short stay availability updated!");
    return refreshedProperty;
  };

  // Handle settings changes
  const _handleSettingsChange = (data) => {
    setAdminData({
      ...adminData,
      settings: data
    });
  };

  // Save settings to backend
  const _saveSettings = async (settingsData) => {
    try {
      setLoading(true);
      const response = await fetch(`${settingsUrl}update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(normalizeSiteSettings(settingsData))
      });

      const result = await response.json();

      if (result.success === 1) {
        setAdminData((prev) => ({
          ...prev,
          settings: normalizeSiteSettings(result.data || settingsData),
        }));

        // Use toast notification instead of Notify component
        toast.success("Settings saved successfully!");
        return true;
      } else {
        throw new Error(result.message || 'Failed to save settings');
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      // Use toast notification instead of Notify component
      toast.error(error.message || "Failed to save settings. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch settings from backend
  const _fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${settingsUrl}getSettings`);
      const result = await response.json();

      if (result.success === 1 && result.data) {
        setAdminData((prev) => ({
          ...prev,
          settings: normalizeSiteSettings(result.data),
        }));
        return true;
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Use toast notification instead of Notify component
      toast.error('Failed to load settings. Please refresh the page.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        adminData,
        _routeToDetails,
        _routeToAgents,
        _routeToUsers,
        _handleChange,
        _cancelAdd,
        _submit,
        _createAgent,
        _changePass,
        _saveChanges,
        _blockAgent,
        _unblockAgent,
        _removeAgent,
        _createProperty,
        _preparePropertyForEdit,
        _savePropertyEdits,
        _cancelProperty,
        _resetDetails,
        _findAndRouteToAgent,
        _handleCategory,
        _approve,
        _updateShortStayAvailability,
        _handleSettingsChange,
        _saveSettings,
        _fetchSettings,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}
