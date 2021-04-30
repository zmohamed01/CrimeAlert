class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.contact_form.subjecthow to present database rails boostrap
  #
  def contact_form(name, email, message)
    @name = name
    @email = email
    @message = message

    mail to: "crimeguardapp@gmail.com", subject: "You've got a new message!"
  end
end
