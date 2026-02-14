export default function TestimonialCard({ testimonial }) {
  return (
    <div className="depoimento">
      <img src={testimonial.image_url} alt={testimonial.author} />
      <p>"{testimonial.content}"</p>
    </div>
  );
}
