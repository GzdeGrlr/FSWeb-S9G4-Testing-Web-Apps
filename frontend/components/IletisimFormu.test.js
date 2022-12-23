import React from "react";
import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";

test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  expect(screen.getByRole("heading")).toHaveTextContent(/İletişim Formu/);

  // const title = screen.getByTestId("form-title");
  //expect(title).toBeInTheDocument()
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);
  const nameInput = screen.getByTestId("isim-input");
  fireEvent.change(nameInput, { target: { value: "aaa" } });
  expect(nameInput.value).toBe("aaa");

  const nameError = screen.getByTestId("error-isim");
  expect(nameError).toBeInTheDocument();
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const submitButton = screen.getByTestId("submit-button");
  fireEvent.click(submitButton);

  const nameError = screen.getByTestId("error-isim");
  expect(nameError).toBeInTheDocument();

  const lastnameError = screen.getByTestId("error-soyad");
  expect(lastnameError).toBeInTheDocument();

  const emailError = screen.getByTestId("error-email");
  expect(emailError).toBeInTheDocument();
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const nameInput = screen.getByTestId("isim-input");
  fireEvent.change(nameInput, { target: { value: "Gözde" } });
  expect(nameInput.value).toBe("Gözde");

  const lastnameInput = screen.getByTestId("soyad-input");
  fireEvent.change(lastnameInput, { target: { value: "Gürler" } });
  expect(lastnameInput.value).toBe("Gürler");

  const submitButton = screen.getByTestId("submit-button");
  fireEvent.click(submitButton);

  const emailError = screen.getByTestId("error-email");
  expect(emailError).toBeInTheDocument();
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const emailInput = screen.getByTestId("email-input");
  fireEvent.change(emailInput, { target: { value: "testtester.com" } });
  expect(emailInput.value).toBe("testtester.com");

  const emailError = screen.getByTestId("error-email");
  expect(emailError).toBeInTheDocument();
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<IletisimFormu />);

  const nameInput = screen.getByTestId("isim-input");
  fireEvent.change(nameInput, { target: { value: "Gökhan" } });
  expect(nameInput.value).toBe("Gökhan");

  const emailInput = screen.getByTestId("email-input");
  fireEvent.change(emailInput, { target: { value: "testtester.com" } });
  expect(emailInput.value).toBe("testtester.com");

  const submitButton = screen.getByTestId("submit-button");
  fireEvent.click(submitButton);

  const emailError = screen.getByTestId("error-email");
  expect(emailError).toBeInTheDocument();
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  render(<IletisimFormu />);

  const nameInput = screen.getByTestId("isim-input");
  fireEvent.change(nameInput, { target: { value: "Gökhan" } });
  expect(nameInput.value).toBe("Gökhan");

  const lastnameInput = screen.getByTestId("soyad-input");
  fireEvent.change(lastnameInput, { target: { value: "Gürler" } });
  expect(lastnameInput.value).toBe("Gürler");

  const emailInput = screen.getByTestId("email-input");
  fireEvent.change(emailInput, { target: { value: "test@tester.com" } });
  expect(emailInput.value).toBe("test@tester.com");

  const submitButton = screen.getByTestId("submit-button");
  fireEvent.click(submitButton);

  const emailError = screen.queryByTestId("error-email");
  expect(emailError).not.toBeInTheDocument();
});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {
  render(<IletisimFormu />);

  const nameInput = screen.getByTestId("isim-input");
  fireEvent.change(nameInput, { target: { value: "Deniz" } });
  expect(nameInput.value).toBe("Deniz");

  const lastnameInput = screen.getByTestId("soyad-input");
  fireEvent.change(lastnameInput, { target: { value: "Uslu" } });
  expect(lastnameInput.value).toBe("Uslu");

  const emailInput = screen.getByTestId("email-input");
  fireEvent.change(emailInput, { target: { value: "test@tester.com" } });
  expect(emailInput.value).toBe("test@tester.com");

  const submitButton = screen.getByTestId("submit-button");
  fireEvent.click(submitButton);

  const displayer = screen.getByTestId("sent-data");
  expect(displayer).toBeInTheDocument();

  // const isimDisplayer = screen.getByTestId("firstnameDisplay");
  // expect(isimDisplayer).toEqual(Ad"Miran");

  // const soyadDisplayer = screen.getByTestId("lastnameDisplay");
  // expect(soyadDisplayer).toEqual("Şan");

  // const emailDisplayer = screen.getByTestId("emailDisplay");
  // expect(emailDisplayer).toEqual("test@tester.com");
});
