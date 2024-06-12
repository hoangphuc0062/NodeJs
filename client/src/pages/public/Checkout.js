import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OptionAdress } from "../../components";
import axios from "axios";
import formatNumber from "../../ultils/formatNumber";
import { apiCreateOrder } from "../../apis/user";
import { handleToast } from "../../ultils/toast";
// const token = process.env.TOKEN_GIAO_HANG_NHANH;

const Checkout = () => {
  const token = process.env.REACT_APP_TOKEN_GIAO_HANG_NHANH;
  const apiUrl = "https://online-gateway.ghn.vn/shiip/public-api";
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [fee, setFee] = useState(0);
  const { current: reduxCurrent } = useSelector((state) => state.user);
  const [current, setCurrent] = useState(reduxCurrent);
  const [cart, setCart] = useState(current?.cart);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [coupon, setCoupon] = useState("");
  // useEffect(() => {

  // }, [paymentMethod]);

  useEffect(() => {
    setCart(current?.cart);
    updateSubtotal(current?.cart || []);
  }, [current?.cart]);

  useEffect(() => {
    setTotal(subtotal + fee);
  }, [subtotal, fee]);

  useEffect(() => {
    fetchProvinceData();
  }, []);

  useEffect(() => {
    if (selectedProvince) fetchDistrictsData(selectedProvince);
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWardsData(selectedDistrict);
      fetchService(selectedDistrict)
        .then((serviceId) => setSelectedServiceId(serviceId))
        .catch((error) => console.error(error));
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedWard && selectedDistrict && selectedServiceId) {
      fetchFee(selectedWard, selectedDistrict, selectedServiceId);
    }
  }, [selectedWard, selectedDistrict, selectedServiceId]);

  const fetchProvinceData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/master-data/province`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      setProvinces(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tỉnh:", error);
    }
  };

  const fetchDistrictsData = async (provinceId) => {
    try {
      const response = await axios.get(`${apiUrl}/master-data/district`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
        params: { province_id: provinceId },
      });
      setDistricts(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu quận/huyện:", error);
    }
  };

  const fetchWardsData = async (districtId) => {
    try {
      const response = await axios.get(`${apiUrl}/master-data/ward`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
        params: { district_id: districtId },
      });
      setWards(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phường/xã:", error);
    }
  };

  const fetchService = async (districtId) => {
    try {
      const serviceResponse = await axios.get(
        `${apiUrl}/v2/shipping-order/available-services`,
        {
          headers: {
            "Content-Type": "application/json",
            token,
          },
          params: {
            shop_id: 4868495,
            from_district: 1788,
            to_district: districtId,
          },
        }
      );

      if (serviceResponse.data.data && serviceResponse.data.data.length > 0) {
        const firstService = serviceResponse.data.data[0];
        return firstService.service_id;
      } else {
        console.log("Không tìm thấy dịch vụ nào.");
        return "";
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu dịch vụ:", error);
      throw error;
    }
  };

  const fetchFee = async (wardCode, districtId, serviceId) => {
    try {
      const feeResponse = await axios.get(`${apiUrl}/v2/shipping-order/fee`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
        params: {
          from_district_id: 1788,
          to_district_id: districtId,
          to_ward_code: wardCode,
          service_id: serviceId,
          height: 50,
          length: 20,
          weight: 200,
          width: 20,
          insurance_value: 0,
        },
      });

      if (feeResponse.data && feeResponse.data.data) {
        setFee(feeResponse.data.data.total);
      } else {
        console.log("Lỗi khi tính phí: Không nhận được dữ liệu");
      }
    } catch (error) {
      console.error("Lỗi khi lấy phí:", error);
    }
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedDistrict("");
    setSelectedWard("");
    setSelectedServiceId("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedWard("");
    setSelectedServiceId("");
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };
  const updateSubtotal = (newCart) => {
    let newSubtotal = 0;
    newCart.forEach((item) => {
      newSubtotal += item.price * item.quantity;
    });
    setSubtotal(newSubtotal);
  };
  const handleInputChange = (field, value) => {
    setCurrent((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  async function handleOrder() {
    if (paymentMethod === 1) {
      let data = {
        shippingFee: fee,
      };
      if (coupon) {
        data = {
          coupon,
          shippingFee: fee,
        };
      }
      const response = await apiCreateOrder(data);
      if (response.success) {
        handleToast("success", "Order successed");
      } else {
        handleToast("error", "Order failed");
      }
    } else {
      // Handle other payment methods
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">CHECK OUT</h2>
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded-md"
                value={current?.firstname + " " + current?.lastname}
                onChange={(e) => handleInputChange("fullname", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Phone"
                className="w-full p-2 border rounded-md"
                value={current?.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-md"
                value={current?.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Address"
                className="w-full p-2 border rounded-md"
                value={current?.address[0]}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            <OptionAdress
              selectedProvince={selectedProvince}
              provinces={provinces}
              selectedDistrict={selectedDistrict}
              districts={districts}
              selectedWard={selectedWard}
              wards={wards}
              handleProvinceChange={handleProvinceChange}
              handleDistrictChange={handleDistrictChange}
              handleWardChange={handleWardChange}
            />
          </form>
          <div className="bg-white pt-4  pb-4 ">
            <input
              type="text"
              placeholder="Coupon Code"
              className="w-full border rounded-md p-2 mr-2 mb-2"
            />
            <button className="bg-black text-white px-4 py-2">
              Apply Coupon
            </button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">BILLING</h2>
          {cart &&
            cart?.map((item, index) => (
              <div className="flex justify-between pb-4" key={index}>
                <div>
                  <p>{item?.name}</p>
                  <p>{item?.color}</p>
                  <p>{item?.size}</p>
                </div>

                <div>
                  <p className="text-right">
                    {item?.quantity} x {""}
                    {formatNumber(item?.price)}
                  </p>
                </div>
                <div>
                  <p className="text-right">
                    {formatNumber(item?.quantity * item?.price)}
                  </p>
                </div>
              </div>
            ))}
          <div className="py-4">
            <div className="flex justify-between">
              <span>Total</span>
              <span>{formatNumber(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>- 0 VND</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping fee</span>
              <span>{formatNumber(fee)}</span>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatNumber(total)}</span>
            </div>
          </div>
          <button
            className="w-full bg-black text-white py-2  mt-4"
            onClick={() => handleOrder()}
          >
            ORDER
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-bold mb-4">PHƯƠNG THỨC THANH TOÁN</h2>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="payment"
              className="form-radio"
              checked={paymentMethod === 1}
              value={1}
              onChange={(e) => setPaymentMethod(Number(e.target.value))}
            />
            <span className="ml-2">Thanh toán trực tiếp khi giao hàng</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="payment"
              className="form-radio"
              checked={paymentMethod === 2}
              value={2}
              onChange={(e) => setPaymentMethod(Number(e.target.value))}
            />
            <span className="ml-2">Thanh toán bằng VNPAY</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
