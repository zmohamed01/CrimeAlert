class Contact < MailForm::Base
	attribute :name,   :validate => true
	attribute :message,   :validate => true
	attribute :email,   :validate => /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	
	def headers 
		{
			:subject => "Contact Form",
			:to => "lp00668@surrey.ac.uk",
			:from => %("#{name}" <#{email}>)
		}
	end
end
	