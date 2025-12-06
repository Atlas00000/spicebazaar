/**
 * Enhanced Spice Bazaar Homepage
 * Using new FAANG-level component system
 */

"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, BookOpen, Sparkles, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

// New component imports
import { FluidNavigation } from '@/components/navigation'
import { FluidHeroSection, FluidSection, GlossyCard } from '@/components/hero'
import { InteractiveStatCard, CircularStat, StatWithSparkline, StatsGrid } from '@/components/stats'
import { ProductsSection } from '@/components/products'
import { CategoriesSection } from '@/components/categories'
import { CollectionsSection } from '@/components/collections'
import { RecipesSection } from '@/components/recipes'
import { StoriesSection } from '@/components/stories'
import { TestimonialsSection } from '@/components/testimonials'
import { NewsletterSection } from '@/components/newsletter'
import { FABCluster } from '@/components/fab'
import { FeatureGrid } from '@/components/layout/FeatureGrid'
import { FluidFooter } from '@/components/footer'
import { NotificationProvider, useNotifications } from '@/components/layout/NotificationSystem'
import { SearchOverlay, useSearchOverlay } from '@/components/layout/SearchOverlay'
import { ScrollProgressIndicator } from '@/components/effects/ScrollProgressIndicator'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { AnimatedButton } from '@/components/animated/AnimatedButton'
import { AnimatedBadge } from '@/components/animated/AnimatedBadge'

// Sample data - Featured spices for hero carousel
const heroProducts = [
  {
    id: '1',
    name: 'Saffron Threads',
    tagline: 'The world\'s most precious spice - Golden threads of pure luxury',
    image: '/saffron-threads-in-glass-jar.png',
    color: '#fbbf24',
    price: 24.99,
  },
  {
    id: '2',
    name: 'Ras el Hanout',
    tagline: 'Moroccan magic in every pinch - A symphony of 12 exotic spices',
    image: '/moroccan-spice-blend-ras-el-hanout.png',
    color: '#c65d32',
    price: 18.99,
  },
  {
    id: '3',
    name: 'Green Cardamom',
    tagline: 'Queen of spices from Kerala - Sweet, floral perfection',
    image: '/green-cardamom-pods.png',
    color: '#10b981',
    price: 16.99,
  },
  {
    id: '4',
    name: 'Harissa Paste',
    tagline: 'North African fire - Bold heat with smoky depth',
    image: '/harissa-paste-in-jar.png',
    color: '#ef4444',
    price: 12.99,
  },
]

// Product grid data with enhanced details
const featuredSpices = [
  {
    id: '1',
    name: 'Saffron Threads',
    origin: 'Kashmir, India',
    price: 24.99,
    originalPrice: 29.99,
    image: '/saffron-threads-in-glass-jar.png',
    rating: 5,
    reviews: 128,
    badge: 'Premium',
    inStock: true,
    color: '#fbbf24',
    description: 'The world\'s most precious spice, saffron threads are hand-harvested from the crocus flower, requiring over 75,000 flowers to produce just one pound. Our premium saffron comes from the high-altitude fields of Kashmir, where the unique terroir produces threads with exceptional color, aroma, and flavor. Each thread is carefully selected for its deep crimson color and golden tips, ensuring maximum potency. When steeped, these threads release their distinctive golden hue and complex flavor profile—honey-like sweetness with subtle floral and earthy notes. A little goes a long way, making this one of the most cost-effective ways to add luxury to your dishes.',
  },
  {
    id: '2',
    name: 'Ras el Hanout',
    origin: 'Morocco',
    price: 18.99,
    image: '/moroccan-spice-blend-ras-el-hanout.png',
    rating: 5,
    reviews: 96,
    badge: 'Best Seller',
    inStock: true,
    color: '#c65d32',
    description: 'Experience the authentic taste of Morocco with our traditional Ras el Hanout, a complex blend of 12+ aromatic spices that has been perfected over generations. This "head of the shop" blend includes cinnamon, ginger, turmeric, cardamom, nutmeg, allspice, cloves, black pepper, coriander, cumin, and more, each spice carefully balanced to create a harmonious flavor profile. Our blend is created using a traditional recipe from the souks of Marrakech, where master spice merchants have refined this combination for centuries. Perfect for tagines, couscous, and grilled meats, this blend adds warmth, depth, and an unmistakable North African character to any dish.',
  },
  {
    id: '3',
    name: 'Green Cardamom',
    origin: 'Kerala, India',
    price: 16.99,
    image: '/green-cardamom-pods.png',
    rating: 5,
    reviews: 84,
    inStock: true,
    color: '#10b981',
    description: 'Discover why cardamom is called the "Queen of Spices" with our premium green cardamom pods from the spice gardens of Kerala. These aromatic pods contain tiny black seeds that release an intoxicating fragrance when crushed—a complex blend of sweet, floral, and citrusy notes with hints of eucalyptus and mint. Cardamom is essential to Indian, Middle Eastern, and Scandinavian cuisines, adding its distinctive flavor to everything from chai and coffee to curries and desserts. Our cardamom pods are harvested at peak ripeness and carefully dried to preserve their essential oils, ensuring maximum flavor and aroma. Each pod is plump and green, indicating freshness and quality.',
  },
  {
    id: '4',
    name: 'Harissa Paste',
    origin: 'Tunisia',
    price: 12.99,
    image: '/harissa-paste-in-jar.png',
    rating: 4,
    reviews: 67,
    badge: 'Hot',
    inStock: true,
    color: '#ef4444',
    description: 'Ignite your dishes with our authentic harissa, a fiery North African chili paste that brings both heat and incredible depth of flavor. Made from sun-dried red chilies, garlic, caraway seeds, coriander, and olive oil, our harissa is slow-roasted to develop its characteristic smoky, complex flavor. This isn\'t just heat—it\'s a carefully balanced paste where the smokiness of the chilies, the earthiness of the spices, and the richness of the olive oil create a flavor profile that is both bold and nuanced. Perfect for tagines, couscous, grilled meats, and as a condiment, harissa adds that distinctive North African character that makes dishes truly memorable. A little goes a long way, so start with a small amount and adjust to your heat preference.',
  },
]

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Premium Quality',
    description: 'Hand-selected spices from the finest markets across Morocco and India.',
    link: { label: 'Learn More', href: '#quality' },
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: 'Fast Delivery',
    description: 'Get your authentic spices delivered fresh to your doorstep in 2-3 days.',
    link: { label: 'Shipping Info', href: '#shipping' },
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: '500+ Recipes',
    description: 'Explore our collection of authentic recipes from master chefs worldwide.',
    link: { label: 'View Recipes', href: '#recipes' },
  },
]

// Collections data
const featuredCollections = [
  {
    id: 'moroccan-magic',
    name: 'Moroccan Magic',
    description: 'Complete your tagine with our signature Moroccan blend collection, featuring the essential spices that define North African cuisine. This carefully curated set includes our premium Ras el Hanout—a complex blend of 12+ spices including cinnamon, ginger, turmeric, and cardamom—along with individual spices that allow you to customize your dishes. Perfect for tagines, couscous, and other Moroccan classics, this collection comes with a detailed recipe guide that teaches you the art of Moroccan spice blending. Each spice is sourced directly from Moroccan markets, ensuring authentic flavors that transport you to the bustling souks of Marrakech.',
    icon: '🏺',
    spices: ['Ras el Hanout', 'Cinnamon', 'Ginger', 'Turmeric'],
    price: 34.99,
    originalPrice: 42.99,
    savings: 'Save $8 vs buying separately',
    gradient: '#c65d32, #f97316',
    benefits: ['Authentic flavor profile', 'Perfect balance', 'Traditional blend', 'Recipe guide included'],
    featured: true,
  },
  {
    id: 'indian-feast',
    name: 'Indian Feast',
    description: 'Master the art of Indian cooking with this essential spice collection that includes everything you need to create authentic dishes from across the subcontinent. This comprehensive set features premium cardamom pods from Kerala, aromatic cumin seeds, fragrant coriander, and the precious saffron threads from Kashmir. Each spice is carefully selected for its quality and authenticity, ensuring your curries, biryanis, and masalas have that distinctive Indian character. The collection includes detailed spice pairing guides and traditional recipes that showcase how these spices work together to create the complex, layered flavors that define Indian cuisine. Perfect for both beginners and experienced cooks looking to elevate their Indian cooking.',
    icon: '🕉️',
    spices: ['Cardamom', 'Cumin', 'Coriander', 'Saffron'],
    price: 42.99,
    originalPrice: 52.99,
    savings: 'Save $10 vs buying separately',
    gradient: '#fbbf24, #f59e0b',
    benefits: ['Rich aromas', 'Complex flavors', 'Heritage blend', 'Cooking tips included'],
    featured: false,
  },
]

// Recipes data
const featuredRecipes = [
  {
    id: 'moroccan-tagine',
    title: 'Moroccan Tagine',
    description: 'Experience the magic of slow-cooked North African cuisine with this traditional tagine recipe that showcases the art of spice blending. This iconic dish features tender, fall-off-the-bone meat that has been marinated in a complex blend of Moroccan spices, then slow-cooked with dried fruits, vegetables, and aromatic herbs. The result is a dish that is at once sweet, savory, and deeply aromatic—a perfect harmony of flavors that has been perfected over centuries. The slow cooking process allows the spices to fully infuse the meat, creating layers of flavor that develop and deepen with each hour. Serve this impressive dish at your next gathering and watch as your guests are transported to the vibrant markets of Morocco.',
    image: '/moroccan-tagine-with-vegetables-and-spices.png',
    time: '2 hours',
    difficulty: 'Medium' as const,
    servings: 6,
    spices: ['Ras el Hanout', 'Cinnamon', 'Ginger'],
    ingredients: ['2 lbs lamb shoulder, cubed', '2 tbsp Ras el Hanout', '1 cinnamon stick', '2 onions, sliced', '1 cup dried apricots', '2 cups chicken broth', 'Fresh cilantro'],
    color: '#c65d32',
  },
  {
    id: 'indian-biryani',
    title: 'Indian Biryani',
    description: 'Master the art of biryani with this authentic recipe that creates a fragrant, layered rice dish featuring perfectly spiced meat and aromatic saffron. This is a dish that requires patience and technique, but the results are absolutely spectacular. Each layer is carefully spiced and cooked separately before being combined, creating a dish where every grain of rice is infused with flavor, and every bite reveals new layers of complexity. The saffron adds its distinctive golden color and floral aroma, while the cardamom and bay leaves provide the essential fragrance that makes biryani so distinctive. This recipe includes detailed instructions for achieving that perfect texture—fluffy, separate grains of rice that are fully cooked but not mushy, and tender, flavorful meat that has been marinated and cooked to perfection.',
    image: '/indian-biryani-with-saffron-and-spices.png',
    time: '1.5 hours',
    difficulty: 'Hard' as const,
    servings: 8,
    spices: ['Saffron', 'Cardamom', 'Bay Leaves'],
    ingredients: ['2 cups basmati rice', '1 lb chicken, marinated', 'Pinch of saffron', '6 green cardamom pods', '3 bay leaves', 'Fried onions', 'Mint & cilantro'],
    color: '#fbbf24',
  },
  {
    id: 'tunisian-couscous',
    title: 'Tunisian Couscous',
    description: 'Discover the bright, fresh flavors of Tunisian cuisine with this light and fluffy couscous recipe that pairs perfectly with spicy harissa and seasonal vegetables. This dish is a celebration of simplicity and flavor, where the delicate texture of the couscous provides the perfect canvas for the bold, spicy harissa and the fresh, vibrant vegetables. The harissa adds a complex heat that builds gradually, while the vegetables provide sweetness and texture. This is a dish that comes together quickly but delivers big on flavor, making it perfect for weeknight dinners or impressive enough for special occasions. The recipe includes tips for achieving that perfect fluffy texture and for balancing the heat of the harissa to your preference.',
    image: '/tunisian-couscous-with-harissa.png',
    time: '45 mins',
    difficulty: 'Easy' as const,
    servings: 4,
    spices: ['Harissa', 'Cumin', 'Coriander'],
    ingredients: ['2 cups couscous', '3 tbsp harissa paste', 'Mixed vegetables', '1 tsp ground cumin', '1 tsp coriander seeds', 'Olive oil', 'Fresh herbs'],
    color: '#ef4444',
  },
]

// Stories data
const culturalStories = [
  {
    id: 'moroccan-tradition',
    title: 'Moroccan Tradition',
    subtitle: 'The Art of Spice Blending',
    description: 'In the bustling souks of Marrakech, master spice merchants have perfected their craft over generations, creating blends that are as much art as they are science. Each blend tells a story of family secrets passed down through the ages, ancient recipes that have stood the test of time, and the vibrant colors that define North African cuisine. These artisans understand the delicate balance of flavors, knowing exactly when to add a pinch of warmth, a hint of sweetness, or a burst of heat. When you use our Moroccan spices, you\'re not just adding flavor to your dishes—you\'re connecting with a tradition that spans centuries, bringing the authentic taste of the Maghreb to your kitchen.',
    image: '/traditional-spice-merchant-in-moroccan-bazaar-with.png',
    location: 'Marrakech, Morocco',
    date: 'Ancient Tradition',
    icon: '🏺',
    color: '#c65d32',
    gradient: '#c65d32, #f97316',
  },
  {
    id: 'indian-heritage',
    title: 'Indian Heritage',
    subtitle: 'From Kerala to Kashmir',
    description: 'The spice gardens of Kerala and the saffron fields of Kashmir represent centuries of meticulous cultivation and ancient trade routes that once connected the East to the West. These regions have fundamentally shaped global cuisine, introducing flavors that have become essential to kitchens around the world. The aromatic treasures from these lands—from the black pepper that once drove exploration to the saffron that graces the finest dishes—continue to enchant chefs and home cooks alike. When you choose spices from these regions, you\'re experiencing flavors that have been refined over millennia, each one carrying the essence of its terroir and the care of generations of farmers who have dedicated their lives to perfecting these precious crops.',
    image: '/indian-biryani-with-saffron-and-spices.png',
    location: 'Kerala & Kashmir, India',
    date: '5000+ Years',
    icon: '🕉️',
    color: '#fbbf24',
    gradient: '#fbbf24, #f59e0b',
  },
  {
    id: 'sustainable-sourcing',
    title: 'Sustainable Sourcing',
    subtitle: 'Supporting Communities',
    description: 'We work directly with family farms and cooperatives around the world, ensuring fair trade practices and sustainable farming methods that protect both the environment and the communities that depend on spice cultivation. Every purchase you make supports traditional agriculture and local communities that are preserving ancient cultivation techniques passed down through generations. By choosing Spice Bazaar, you\'re not just buying spices—you\'re investing in the future of sustainable agriculture, supporting farmers who use time-honored methods that produce superior quality while protecting biodiversity. Together, we\'re building a more sustainable and equitable spice trade that honors both tradition and innovation.',
    image: '/moroccan-spice-market-bazaar-colorful-spices.png',
    location: 'Worldwide',
    date: 'Modern Practice',
    icon: '🌱',
    color: '#10b981',
    gradient: '#10b981, #059669',
  },
]

// Testimonials data
const customerTestimonials = [
  {
    id: 'testimonial-1',
    name: 'Chef Maria Rodriguez',
    role: 'Executive Chef',
    company: 'La Cocina',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    comment: 'The saffron threads are absolutely exceptional. They\'ve transformed my paella and risotto dishes completely. The quality is unmatched—deep golden color, intense aroma, and that unmistakable flavor that only comes from the finest saffron. My customers can taste the difference immediately, and I\'ve received countless compliments on dishes that now have that authentic Spanish character. This is the real deal, and I won\'t use anything else in my kitchen.',
    verified: true,
    color: '#c65d32',
  },
  {
    id: 'testimonial-2',
    name: 'David Chen',
    role: 'Home Cook & Food Blogger',
    company: 'Spice Journey Blog',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    comment: 'I\'ve been using their Ras el Hanout for months now, and it has completely revolutionized my Moroccan cooking. The depth of flavor it adds to my tagines is incredible—you can taste every single spice in the blend, from the warm cinnamon to the earthy cumin, all perfectly balanced. It\'s authentic, aromatic, and transports you straight to the souks of Marrakech. My family and friends are always asking for my tagine recipe, and I tell them the secret is this amazing spice blend. Absolutely worth every penny!',
    verified: true,
    color: '#fbbf24',
  },
  {
    id: 'testimonial-3',
    name: 'Sarah Johnson',
    role: 'Restaurant Owner',
    company: 'Spice & Soul',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    comment: 'Our customers can\'t get enough of the cardamom pods from Spice Bazaar. They\'re the secret ingredient in our signature chai blend that keeps people coming back. The pods are incredibly fresh, bursting with that distinctive floral fragrance, and perfectly packaged to maintain their essential oils. We\'ve tried other suppliers, but nothing compares to the quality and consistency we get from Spice Bazaar. Our chai sales have increased by 40% since we started using their cardamom, and customers specifically ask for "the chai with the amazing cardamom." It\'s become our signature!',
    verified: true,
    color: '#10b981',
  },
]

// Categories data
const spiceCategories = [
  {
    id: '1',
    name: 'Warming Spices',
    description: 'Embrace the cozy comfort of warming spices that add rich depth and aromatic warmth to your dishes. Our collection features premium cinnamon from Sri Lanka, fragrant nutmeg from Indonesia, and pungent cloves from Madagascar. These spices are perfect for winter comfort foods, spiced beverages, and baked goods, creating that inviting warmth that makes every meal feel like a celebration. Each spice is carefully selected for its intensity and flavor profile, ensuring your dishes have that perfect balance of warmth and complexity.',
    icon: '🔥',
    count: '12 varieties',
    gradient: '#ef4444, #f97316',
    featured: true,
  },
  {
    id: '2',
    name: 'Aromatic Herbs',
    description: 'Discover the bright, vibrant flavors of our extensive herb collection, featuring both fresh and dried varieties from around the world. From the earthy depth of Mediterranean oregano to the citrusy brightness of Thai basil, our aromatic herbs bring freshness and complexity to every dish. Perfect for salads, marinades, sauces, and garnishes, these herbs are harvested at peak freshness and carefully preserved to maintain their essential oils and vibrant colors. Transform simple ingredients into extraordinary meals with the power of fresh, aromatic herbs.',
    icon: '🌿',
    count: '18 varieties',
    gradient: '#10b981, #059669',
  },
  {
    id: '3',
    name: 'Exotic Blends',
    description: 'Journey through the world\'s most celebrated spice blends, each one a carefully crafted masterpiece of flavor. Our exotic blends collection includes everything from the complex 12-spice Moroccan Ras el Hanout to the fiery Ethiopian Berbere, the aromatic Indian Garam Masala, and the fragrant Chinese Five-Spice. Each blend is created using traditional recipes that have been perfected over centuries, combining spices in perfect harmony to create flavors that are greater than the sum of their parts. These blends are the secret weapons of master chefs and home cooks alike.',
    icon: '🌍',
    count: '8 blends',
    gradient: '#8b5cf6, #6366f1',
  },
  {
    id: '4',
    name: 'Hot & Spicy',
    description: 'Ignite your taste buds with our collection of chilies and peppers that bring bold, fiery heat to your culinary creations. From the smoky depth of chipotle to the fruity heat of habanero, the complex warmth of Aleppo pepper to the intense fire of ghost peppers, our hot and spicy collection offers heat levels for every palate. Each pepper is carefully selected for its unique flavor profile, not just its heat, ensuring that your dishes have complexity alongside the fire. Whether you\'re crafting a subtle warmth or seeking intense heat, find the perfect pepper to elevate your dishes.',
    icon: '🌶️',
    count: '15 varieties',
    gradient: '#dc2626, #ea580c',
  },
  {
    id: '5',
    name: 'Sweet Spices',
    description: 'Indulge in the delicate, aromatic world of sweet spices that transform desserts and sweet dishes into extraordinary experiences. Our collection features premium vanilla beans from Madagascar, fragrant cardamom pods from India, golden saffron threads from Kashmir, and exotic star anise from China. These spices add layers of complexity to sweet creations, from classic vanilla custards to spiced chai, saffron-infused rice puddings to cardamom-scented pastries. Each spice is chosen for its purity and intensity, ensuring that even a small amount creates a profound impact on your sweet creations.',
    icon: '🍯',
    count: '10 varieties',
    gradient: '#fbbf24, #f59e0b',
  },
  {
    id: '6',
    name: 'Umami Boosters',
    description: 'Unlock the deep, savory fifth taste with our collection of umami-boosting spices and powders. From earthy mushroom powders that add meaty depth to vegetarian dishes, to fermented spice pastes that bring complex savory notes, these ingredients are the secret to creating dishes with incredible depth and richness. Our umami boosters include shiitake mushroom powder, miso paste, nutritional yeast, and other fermented treasures that add that satisfying, mouth-watering quality to soups, stews, sauces, and marinades. Discover how these ingredients can transform your cooking with their profound savory character.',
    icon: '🍄',
    count: '6 varieties',
    gradient: '#78716c, #57534e',
  },
]

function HomePageContent() {
  const { showNotification } = useNotifications()
  const search = useSearchOverlay()
  const [wishlistCount, setWishlistCount] = useState(0)
  const [cartCount, setCartCount] = useState(0)

  const handleAddToCart = (id: string) => {
    setCartCount((prev) => prev + 1)
    showNotification({
      type: 'success',
      title: 'Added to cart!',
      message: 'Item has been added to your shopping cart.',
    })
  }

  const handleAddToWishlist = (id: string) => {
    setWishlistCount((prev) => prev + 1)
    showNotification({
      type: 'info',
      title: 'Added to wishlist',
      message: 'Item saved to your wishlist.',
    })
  }

  const handleSearch = async (query: string) => {
    // Simulate search
    return featuredSpices
      .filter((spice) =>
        spice.name.toLowerCase().includes(query.toLowerCase())
      )
      .map((spice) => ({
        id: spice.id,
        title: spice.name,
        category: 'Spices',
        url: `/product/${spice.id}`,
        icon: <Sparkles className="w-5 h-5" />,
      }))
  }

  return (
    <>
      {/* Scroll Progress */}
      <ScrollProgressIndicator color="bg-primary" height={3} />

      {/* Navigation */}
      <FluidNavigation
        items={[
          { label: 'Spices', href: '#spices' },
          { label: 'Recipes', href: '#recipes' },
          { label: 'Stories', href: '#stories' },
          { label: 'About', href: '#about' },
        ]}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onSearch={search.open}
        onCartClick={() => {
          showNotification({
            type: 'info',
            title: 'Shopping Cart',
            message: `You have ${cartCount} items`,
          })
        }}
        onWishlistClick={() => {
          showNotification({
            type: 'info',
            title: 'Wishlist',
            message: `You have ${wishlistCount} saved items`,
          })
        }}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={search.isOpen}
        onClose={search.close}
        onSearch={handleSearch}
        recentSearches={['Saffron', 'Cardamom', 'Harissa']}
        trendingSearches={['Ras el Hanout', 'Turmeric', 'Cinnamon']}
      />

      {/* Fluid Hero Section with Product Carousel */}
      <FluidHeroSection
        products={heroProducts}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />

      {/* Stats Section - Visual Marvel */}
      <FluidSection variant="medium" showOrbs gloss className="-mt-16">
          <div className="container mx-auto px-4">
          <StatsGrid columns={4} staggerDelay={150}>
            {/* Stat 1: Spices with Circular Progress */}
            <CircularStat
              value={50}
              max={100}
              suffix="+"
              label="Premium Spices"
              description="Hand-selected varieties"
              icon={<Sparkles className="w-8 h-8" />}
              color="#c65d32"
              showPercentage
              trend={12}
              trendLabel="vs last month"
            />

            {/* Stat 2: Countries with Sparkline */}
            <StatWithSparkline
              value={25}
              suffix="+"
              label="Source Countries"
              icon={
                <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              }
              color="#fbbf24"
              data={[15, 18, 17, 20, 22, 21, 23, 25]}
              trend="up"
            />

            {/* Stat 3: Customers with Interactive Card */}
            <InteractiveStatCard
              value={10000}
              suffix="+"
              label="Happy Customers"
              description="Worldwide satisfaction"
              icon={<Heart className="w-8 h-8" />}
              color="#ef4444"
              trend={25}
              trendLabel="growth"
            />

            {/* Stat 4: Recipes with Circular */}
            <CircularStat
              value={500}
              max={1000}
              suffix="+"
              label="Authentic Recipes"
              description="Chef-approved dishes"
              icon={<BookOpen className="w-8 h-8" />}
              color="#f97316"
              showPercentage
              trend={8}
            />
          </StatsGrid>
                  </div>
      </FluidSection>

      {/* Features Section with Fluid Design */}
      <FluidSection variant="medium" showOrganic gloss>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
                Why Choose Spice Bazaar
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Experience the difference of authentic, hand-selected spices sourced directly from the world's most renowned spice-growing regions. Our commitment to quality means every jar is filled with the finest ingredients, carefully curated to bring the vibrant flavors and aromatic richness of global cuisine to your kitchen. From the golden threads of Spanish saffron to the complex blends of Moroccan souks, discover spices that tell stories of tradition, culture, and culinary excellence.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <GlossyCard glowColor="#c65d32" className="p-8 h-full">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                    style={{
                      background: 'linear-gradient(135deg, #c65d3240 0%, #fbbf2440 100%)',
                      boxShadow: '0 4px 20px #c65d3230',
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  {feature.link && (
                    <a
                      href={feature.link.href}
                      className="inline-flex items-center text-primary hover:text-secondary transition-colors mt-4 font-medium"
                    >
                      {feature.link.label}
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </GlossyCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </FluidSection>

      {/* Featured Spices - Visual Marvel */}
      <ProductsSection
        title="Premium Spice Collection"
        subtitle="Discover our hand-selected collection of the world's finest spices, sourced directly from the most renowned spice-growing regions. Each spice in our collection is carefully chosen for its exceptional quality, vibrant color, and authentic flavor profile. From the golden saffron fields of Kashmir to the aromatic spice markets of Marrakech, we bring you the very best that global cuisine has to offer, ensuring every dish you create is infused with the rich heritage and tradition of spice trading."
        products={featuredSpices}
        showFilter
        columns={4}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />

      {/* Spice Categories - Visual Marvel */}
      <CategoriesSection
        title="Explore Spice Categories"
        subtitle="Journey through our carefully curated spice categories, each designed to help you discover the perfect flavors for your culinary creations. From warming spices that add cozy comfort to winter dishes, to exotic blends that transport your taste buds to distant lands, our categories make it easy to explore the vast world of spices. Whether you're crafting a delicate dessert, preparing a fiery curry, or seeking the perfect herb blend, find inspiration and guidance in our organized collections."
        categories={spiceCategories}
        onCategoryClick={(categoryId) => {
          showNotification({
            type: 'info',
            title: 'Category Selected',
            message: `Viewing ${spiceCategories.find(c => c.id === categoryId)?.name}`,
          })
        }}
      />

      {/* Featured Collections - Visual Marvel */}
      <CollectionsSection
        title="Curated Collections"
        subtitle="Our expertly curated spice collections are thoughtfully assembled to bring you the perfect combinations for every culinary adventure. Each collection is designed by our spice experts, who understand how different spices complement and enhance each other. Whether you're embarking on a Moroccan culinary journey, exploring the depths of Indian cuisine, or creating your own signature dishes, these collections provide everything you need in one beautifully packaged set. Save time and discover new flavor combinations that will elevate your cooking to new heights."
        collections={featuredCollections}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />

      {/* Culinary Inspirations - Visual Marvel */}
      <RecipesSection
        title="Culinary Inspirations"
        subtitle="Immerse yourself in the rich traditions of global cuisine with our collection of authentic, time-honored recipes. Each recipe celebrates the art of spice blending, showcasing how carefully selected spices can transform simple ingredients into extraordinary dishes. From the slow-cooked complexity of Moroccan tagines to the fragrant layers of Indian biryani, these recipes have been passed down through generations, preserving the culinary wisdom of master chefs and home cooks. Follow our step-by-step guides to recreate these iconic dishes in your own kitchen, and discover the magic that happens when spices meet tradition."
        recipes={featuredRecipes}
        onViewRecipe={(recipeId) => {
          showNotification({
            type: 'success',
            title: 'Opening Recipe',
            message: `Viewing ${featuredRecipes.find(r => r.id === recipeId)?.title}`,
          })
        }}
        onSaveRecipe={(recipeId) => {
          showNotification({
            type: 'info',
            title: 'Recipe Saved',
            message: 'Added to your cookbook!',
          })
        }}
      />

      {/* Cultural Stories - Visual Marvel */}
      <StoriesSection
        title="Stories Behind the Spices"
        subtitle="Every spice in our collection carries with it centuries of tradition, culture, and heritage. Behind each jar lies a rich tapestry of history—from ancient trade routes that connected civilizations to family recipes passed down through generations. Our spices are more than just ingredients; they are storytellers, each one whispering tales of distant lands, traditional farming methods, and the communities that have cultivated them for thousands of years. Discover the fascinating journeys these spices have taken from field to your kitchen, and connect with the cultures and people who have made them an essential part of global cuisine."
        stories={culturalStories}
        onReadMore={(storyId) => {
          showNotification({
            type: 'info',
            title: 'Opening Story',
            message: `Reading ${culturalStories.find(s => s.id === storyId)?.title}`,
          })
        }}
      />

      {/* Customer Testimonials - Visual Marvel */}
      <TestimonialsSection
        title="What Our Customers Say"
        subtitle="Join thousands of satisfied chefs, home cooks, and culinary enthusiasts who have discovered the transformative power of authentic, high-quality spices. Our customers consistently praise the exceptional quality, vibrant flavors, and authentic character of our spices. From professional chefs who rely on our products in their restaurants to home cooks who have elevated their everyday cooking, discover why Spice Bazaar has become the trusted source for premium spices worldwide. Read their stories and see how our spices have inspired their culinary journeys."
        testimonials={customerTestimonials}
        showAll
      />

      {/* Newsletter Signup - Visual Marvel */}
      <NewsletterSection
        subscriberCount={5247}
        showStats
        onSubscribe={(email) => {
          showNotification({
            type: 'success',
            title: 'Welcome to the Spice Club! 🎉',
            message: 'Check your inbox for a confirmation email',
          })
        }}
      />

      {/* Footer - Visual Marvel */}
      <FluidFooter
        showNewsletter={false}
        onNewsletterSubscribe={(email) => {
          showNotification({
            type: 'success',
            title: 'Subscribed!',
            message: 'Thank you for joining our newsletter',
          })
        }}
      />

      {/* Enhanced Floating Action Buttons - Visual Marvel */}
      <FABCluster
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={() => {
          showNotification({
            type: 'info',
            title: 'Shopping Cart',
            message: `You have ${cartCount} items in your cart`,
          })
        }}
        onWishlistClick={() => {
          showNotification({
            type: 'info',
            title: 'Wishlist',
            message: `You have ${wishlistCount} items in your wishlist`,
          })
        }}
        onChatClick={() => {
          showNotification({
            type: 'success',
            title: 'Chat Support',
            message: 'Our team is here to help!',
          })
        }}
      />
    </>
  )
}

export default function EnhancedSpiceBazaarHome() {
  return (
    <NotificationProvider>
      <HomePageContent />
    </NotificationProvider>
  )
}

