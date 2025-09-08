import React from "react";
import { useRef, useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const manger = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getpasswords = async () => {
    try {
      let req = await fetch("http://localhost:3000/");
      let passwords = await req.json();
      console.log("Fetched passwords:", passwords);
      setpasswordArray(passwords);
    } catch (error) {
      console.error("Error fetching passwords:", error);
      toast.error("Failed to load passwords. Please check your server connection.");
    }
  };

  useEffect(() => {
    getpasswords();
  }, []);

  const copytext = (text) => {
    toast("Copy To Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showpassword = () => {
    passwordref.current.type = "text";
    if (ref.current.src.includes("icons/crosseye.png")) {
      ref.current.src = "icons/eye.png";
      passwordref.current.type = "password";
    } else {
      ref.current.src = "icons/crosseye.png";
      passwordref.current.type = "text";
    }
  };
  const savepassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      try {
        // Delete existing entry if id exists
        if (form.id) {
          await fetch("http://localhost:3000/", {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: form.id }),
          });
        }

        // Add new entry
        const newPassword = { ...form, id: uuidv4() };
        const response = await fetch("http://localhost:3000/", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPassword),
        });

        if (!response.ok) {
          throw new Error('Failed to save password');
        }

        // Update local state
        setpasswordArray([...passwordArray, newPassword]);
        setform({ site: "", username: "", password: "" });
        
        toast.success("Password saved successfully!");
      } catch (error) {
        console.error("Error saving password:", error);
        toast.error("Failed to save password. Please try again.");
      }
    } else {
      toast.error("Please fill all fields with at least 4 characters");
    }
  };

  const editpassword = (id) => {
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const deletepassword = async (id) => {
    let c = confirm("Do You Really Want To Delete This Password?");
    if (c) {
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/", {
        method: "delete",
        headers: { "content-type": "applications/json" },
        body: JSON.stringify({ id }),
      });
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
    }
  };
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <div className="  md:container p-2 px-2 md:p-0 md:py-16 md:mx-auto  md:w-3/4 min-h-screen overflow-hidden">
        <h1 className="text-4xl font-bold text-center ">
          <span className="text-green-500">&lt;</span>
          Pss
          <span className="text-green-500">Op/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manger
        </p>
        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1 "
            type="text "
            name="site"
            onChange={handlechange}
            value={form.site}
            id="site"
            placeholder="Enter Website URL"
          />
          <div className="flex  flex-col md:flex-row w-full justify-between gap-8 ">
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1 "
              type="text"
              name="username"
              id="username"
              onChange={handlechange}
              value={form.username}
              placeholder="Enter Email/Username"
            />
            <div className="relative  ">
              <input
                ref={passwordref}
                className=" rounded-full border border-green-500 w-full p-4 py-1   "
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handlechange}
                placeholder="Enter Password  "
              />
              <span
                className="absolute right-[3px] top-[4px]  cursor-pointer "
                onClick={showpassword}
              >
                <img
                  ref={ref}
                  className="p-1 "
                  width={27}
                  src="icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savepassword}
            className="flex justify-center items-center bg-green-500 hover:bg-green-400 rounded-full  gap-2 px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/tsrgicte.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Yours Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords To Show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-200">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white text-center justify-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className=" copyicon   cursor-pointer size-7"
                            onClick={() => {
                              copytext(item.site);
                            }}
                          >
                            <img
                              className=" w-[20px] h-[20px] pt-[3px] pl-[3px]"
                              src="icons/copy.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center justify-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>

                          <div
                            className=" copyicon   cursor-pointer size-7"
                            onClick={() => {
                              copytext(item.site);
                            }}
                          >
                            <img
                              className=" w-[20px] h-[20px] pt-[3px] pl-[3px]"
                              src="icons/copy.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center justify-center ">
                        <div className="flex items-center justify-center">
                          <span>{"*".repeat(item.password.length)}</span>

                          <div
                            className=" copyicon   cursor-pointer size-7"
                            onClick={() => {
                              copytext(item.site);
                            }}
                          >
                            <img
                              className=" w-[20px] h-[20px] pt-[3px] pl-[3px]"
                              src="icons/copy.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center justify-center flex ">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editpassword(item.id);
                          }}
                        >
                          <img
                            className="w-[20px]"
                            src="icons/edit.png"
                            alt=""
                          />
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletepassword(item.id);
                          }}
                        >
                          <img
                            className="w-[20px]"
                            src="icons/delete.png"
                            alt=""
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default manger;
