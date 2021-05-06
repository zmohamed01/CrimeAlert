class Contact < MailForm::Base
	attribute :name,   :validate => true
	attribute :message,   :validate => true
	attribute :email,   :validate => /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	
	def headers 
		{
			:subject => "Contact Form",
			:to => "crimeguardapp@gmail.com",
			:from => %("#{name}" <#{email}>)
		}
	end
end
	