
import { useState } from 'react';
import { Star, User, ThumbsUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    userName: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    title: "Amazing quality!",
    content: "I was skeptical at first, but this product exceeded my expectations. The build quality is excellent and shipping was super fast.",
    product: "Wireless Bluetooth Headphones",
    verified: true,
    helpful: 24,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"]
  },
  {
    id: 2,
    userName: "Mike Chen",
    rating: 4,
    date: "2024-01-12",
    title: "Good value for money",
    content: "Solid product overall. The only minor issue is that the battery life could be better, but for the price point, it's definitely worth it.",
    product: "Smart Fitness Watch",
    verified: true,
    helpful: 18,
    images: []
  },
  {
    id: 3,
    userName: "Emily Rodriguez",
    rating: 5,
    date: "2024-01-10",
    title: "Perfect for professional use",
    content: "As a photographer, I needed something reliable and this lens delivers. Sharp images, great bokeh, and excellent build quality.",
    product: "Professional Camera Lens",
    verified: true,
    helpful: 31,
    images: ["https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=100&h=100&fit=crop"]
  },
  {
    id: 4,
    userName: "David Park",
    rating: 3,
    date: "2024-01-08",
    title: "Decent but not exceptional",
    content: "The chair is comfortable enough for daily use, but I expected better lumbar support given the price. Assembly was straightforward though.",
    product: "Ergonomic Office Chair",
    verified: false,
    helpful: 12,
    images: []
  }
];

const Reviews = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState("all");

  const filteredReviews = mockReviews
    .filter(review => filterRating === "all" || review.rating.toString() === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "rating-high":
          return b.rating - a.rating;
        case "rating-low":
          return a.rating - b.rating;
        case "helpful":
          return b.helpful - a.helpful;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;
  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
    rating,
    count: mockReviews.filter(review => review.rating === rating).length,
    percentage: (mockReviews.filter(review => review.rating === rating).length / mockReviews.length) * 100
  }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Customer Reviews
          </h1>
          <p className="text-gray-600 text-lg">
            See what our customers are saying about their purchases
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Reviews Overview */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-aliblue-600 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{mockReviews.length} reviews</p>
              </div>

              <div className="space-y-2 mb-6">
                {ratingDistribution.reverse().map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-2 text-sm">
                    <span className="w-3">{rating}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-gray-600">{count}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="rating-high">Highest Rating</SelectItem>
                      <SelectItem value="rating-low">Lowest Rating</SelectItem>
                      <SelectItem value="helpful">Most Helpful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Rating
                  </label>
                  <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredReviews.map((review, index) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg shadow-md p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-aliblue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-aliblue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.userName}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{review.product}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

                  {review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt="Review"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more reviews</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reviews;
