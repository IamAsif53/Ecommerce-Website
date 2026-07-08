function OrderTable({
  orders,
  handleStatusChange,
}) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-2xl font-semibold">
          No Orders Found
        </h2>

        <p className="text-gray-500 mt-2">
          Orders will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold">
          Customer Orders
        </h2>

        <span className="text-gray-500">
          {orders.length} Orders
        </span>

      </div>

      <div className="space-y-8">

        {orders.map((order) => {

          const orderNumber =
            "ORD-" +
            order._id.slice(-6).toUpperCase();

          return (

            <div
              key={order._id}
              className="border rounded-2xl overflow-hidden"
            >

              {/* Header */}

              <div className="bg-gray-50 p-5 flex flex-col md:flex-row justify-between gap-4">

                <div>

                  <h3 className="text-xl font-bold">
                    {orderNumber}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg p-2"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                  </select>

                </div>

              </div>

              {/* Customer */}

              <div className="grid md:grid-cols-2 gap-6 p-6 border-b">

                <div>

                  <h4 className="font-bold mb-3">
                    Customer
                  </h4>

                  <p>
                    <strong>Name:</strong>{" "}
                    {order.customerName}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {order.user}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {order.phone}
                  </p>

                </div>

                <div>

                  <h4 className="font-bold mb-3">
                    Shipping
                  </h4>

                  <p>{order.address}</p>

                  <p>
                    {order.city},{" "}
                    {order.postalCode}
                  </p>

                  <p>{order.country}</p>

                  <p className="mt-3">
                    <strong>Payment:</strong>{" "}
                    {order.paymentMethod}
                  </p>

                </div>

              </div>

              {/* Products */}

              <div className="p-6 space-y-4">

                {order.items.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex gap-5 border rounded-xl p-4"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-lg object-cover border"
                      />

                      <div className="flex-1">

                        <h4 className="font-bold text-lg">
                          {item.name}
                        </h4>

                        <div className="flex gap-6 mt-3">

                          <p>
                            Price
                            <br />

                            <strong>
                              $
                              {item.price}
                            </strong>
                          </p>

                          <p>
                            Qty
                            <br />

                            <strong>
                              {item.quantity}
                            </strong>
                          </p>

                          <p>
                            Total
                            <br />

                            <strong>
                              $
                              {item.price *
                                item.quantity}
                            </strong>
                          </p>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

              {/* Footer */}

              <div className="bg-gray-50 p-5 flex justify-between items-center">

                <h3 className="text-2xl font-bold">
                  Total
                </h3>

                <h3 className="text-3xl font-bold text-green-600">
                  ${order.totalPrice}
                </h3>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}

export default OrderTable;