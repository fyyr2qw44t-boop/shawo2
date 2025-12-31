"use client"

import { useState } from "react"

export default function AppointmentForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	})
	const [errors, setErrors] = useState({})
	const [status, setStatus] = useState(null)
	const [touchedFields, setTouchedFields] = useState({})

	const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	const validatePhone = (phone) => /^[0-9\s\-\+\(\)]*$/.test(phone) && phone.length >= 10

	const handleFieldChange = (field, value) => {
		setFormData(prev => ({ ...prev, [field]: value }))
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: "" }))
		}
	}

	const handleFieldBlur = (field) => {
		setTouchedFields(prev => ({ ...prev, [field]: true }))
		if (field === "email" && formData.email && !validateEmail(formData.email)) {
			setErrors(prev => ({ ...prev, email: "Geçerli bir e-posta giriniz" }))
		}
		if (field === "phone" && formData.phone && !validatePhone(formData.phone)) {
			setErrors(prev => ({ ...prev, phone: "Geçerli bir telefon numarası giriniz" }))
		}
		if (field === "name" && !formData.name) {
			setErrors(prev => ({ ...prev, name: "İsim gerekli" }))
		}
		if (field === "message" && !formData.message) {
			setErrors(prev => ({ ...prev, message: "Mesaj gerekli" }))
		}
	}

	async function handleSubmit(e) {
		e.preventDefault()
		let newErrors = {}
		if (!formData.name) newErrors.name = "İsim gerekli"
		if (!formData.email) newErrors.email = "E-posta gerekli"
		if (formData.email && !validateEmail(formData.email)) newErrors.email = "Geçerli bir e-posta giriniz"
		if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = "Geçerli bir telefon numarası giriniz"
		if (!formData.message) newErrors.message = "Mesaj gerekli"

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			setTouchedFields({ name: true, email: true, phone: true, message: true })
			return
		}

		setStatus("loading")
		setErrors({})
		try {
			const response = await fetch("/api/appointments", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			})
			const data = await response.json()
			if (!response.ok) {
				setStatus("error")
				setErrors({ submit: data.error || "Gönderim başarısız oldu. Lütfen tekrar deneyin." })
				return
			}
			setStatus("success")
			setTimeout(() => {
				setFormData({ name: "", email: "", phone: "", message: "" })
				setTouchedFields({})
				setStatus(null)
			}, 2000)
		} catch (err) {
			console.error("Submit error:", err)
			setStatus("error")
			setErrors({ submit: err.message || "Bir hata oluştu. Lütfen tekrar deneyin." })
		}
	}

	return (
		<div className="w-full max-w-lg">
			{status === "success" && (
				<div className="mb-6 p-4 bg-green-50/80 border border-green-200 rounded-lg text-green-700 text-sm animate-pulse">
					<span className="font-medium">✓ Başarılı!</span> Talebiniz alındı. Kısa süre içinde sizinle iletişime geçeceğiz.
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-5">
				{/* Name */}
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-mutedgold/90 mb-2">İsim <span className="text-red-400">*</span></label>
					<input
						id="name"
						type="text"
						value={formData.name}
						onChange={(e) => handleFieldChange("name", e.target.value)}
						onBlur={() => handleFieldBlur("name")}
						placeholder="Adınız"
						className={`w-full px-4 py-3 border-2 rounded-lg bg-white/50 backdrop-blur-sm transition-all focus:outline-none focus:bg-white/80 ${
							errors.name && touchedFields.name
								? "border-red-400 focus:border-red-500"
								: "border-mutedgold/20 focus:border-mutedgold/60"
						}`}
						aria-invalid={!!errors.name}
						aria-describedby={errors.name ? "name-error" : undefined}
					/>
					{errors.name && touchedFields.name && (
						<p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>
					)}
				</div>

				{/* Email */}
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-mutedgold/90 mb-2">E-posta <span className="text-red-400">*</span></label>
					<input
						id="email"
						type="email"
						value={formData.email}
						onChange={(e) => handleFieldChange("email", e.target.value)}
						onBlur={() => handleFieldBlur("email")}
						placeholder="ornek@email.com"
						className={`w-full px-4 py-3 border-2 rounded-lg bg-white/50 backdrop-blur-sm transition-all focus:outline-none focus:bg-white/80 ${
							errors.email && touchedFields.email
								? "border-red-400 focus:border-red-500"
								: "border-mutedgold/20 focus:border-mutedgold/60"
						}`}
						aria-invalid={!!errors.email}
						aria-describedby={errors.email ? "email-error" : undefined}
					/>
					{errors.email && touchedFields.email && (
						<p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>
					)}
				</div>

				{/* Phone */}
				<div>
					<label htmlFor="phone" className="block text-sm font-medium text-mutedgold/90 mb-2">Telefon <span className="text-xs text-mutedgold/60">(isteğe bağlı)</span></label>
					<input
						id="phone"
						type="tel"
						value={formData.phone}
						onChange={(e) => handleFieldChange("phone", e.target.value)}
						onBlur={() => handleFieldBlur("phone")}
						placeholder="+90 555 555 55 55"
						className={`w-full px-4 py-3 border-2 rounded-lg bg-white/50 backdrop-blur-sm transition-all focus:outline-none focus:bg-white/80 ${
							errors.phone && touchedFields.phone
								? "border-red-400 focus:border-red-500"
								: "border-mutedgold/20 focus:border-mutedgold/60"
						}`}
						aria-invalid={!!errors.phone}
						aria-describedby={errors.phone ? "phone-error" : undefined}
					/>
					{errors.phone && touchedFields.phone && (
						<p id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</p>
					)}
				</div>

				{/* Message */}
				<div>
					<label htmlFor="message" className="block text-sm font-medium text-mutedgold/90 mb-2">Mesaj <span className="text-red-400">*</span></label>
					<textarea
						id="message"
						value={formData.message}
						onChange={(e) => handleFieldChange("message", e.target.value)}
						onBlur={() => handleFieldBlur("message")}
						placeholder="Kısa bir mesaj bırakın... (ör: Hangi koleksiyonlar ilginizi çekiyor?)"
						rows={5}
						className={`w-full px-4 py-3 border-2 rounded-lg bg-white/50 backdrop-blur-sm transition-all focus:outline-none focus:bg-white/80 resize-none ${
							errors.message && touchedFields.message
								? "border-red-400 focus:border-red-500"
								: "border-mutedgold/20 focus:border-mutedgold/60"
						}`}
						aria-invalid={!!errors.message}
						aria-describedby={errors.message ? "message-error" : undefined}
					/>
					{errors.message && touchedFields.message && (
						<p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>
					)}
				</div>

				{/* Submit Error */}
				{errors.submit && status === "error" && (
					<div className="p-3 bg-red-50/80 border border-red-200 rounded-lg text-red-700 text-sm">
						{errors.submit}
					</div>
				)}

				{/* Submit Button */}
				<button
					type="submit"
					disabled={status === "loading" || status === "success"}
					className="w-full px-6 py-3 bg-gradient-to-r from-mutedgold to-mutedgold/90 text-black font-medium rounded-lg hover:shadow-lg hover:from-mutedgold hover:to-mutedgold/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-mutedgold/50 focus:ring-offset-2"
				>
					{status === "loading" ? (
						<span className="flex items-center justify-center gap-2">
							<span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
							Gönderiliyor...
						</span>
					) : status === "success" ? (
						<span className="flex items-center justify-center gap-2">
							<span>✓ Gönderildi</span>
						</span>
					) : (
						"Randevu Talep Et"
					)}
				</button>

				<p className="text-xs text-mutedgold/70 text-center">
					<span className="text-red-400">*</span> Gerekli alanlar
				</p>
			</form>
		</div>
	)
}
